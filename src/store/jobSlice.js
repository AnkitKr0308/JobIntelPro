import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateJob,
  fetchGetAllJobs,
  fetchGetJobById,
} from "../api/jobsAPI";

export const CreateJob = createAsyncThunk("job/createJob", async (jobData) => {
  const response = await fetchCreateJob(jobData);
  return response;
});

export const GetAllJobs = createAsyncThunk("job/getAllJobs", async () => {
  const response = await fetchGetAllJobs();
  return response;
});

export const GetJobById = createAsyncThunk("job/getJobById", async (jobId) => {
  const response = await fetchGetJobById(jobId);
  return response;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    jobs: [],
    filteredJobs: [],
    countries: [],
    cities: [],
    error: null,
    status: false,
  },
  reducers: {
    filterJobs: (state, action) => {
      const { countries, cities } = action.payload;

      state.filteredJobs = state.jobs.filter((job) => {
        const countryMatch =
          countries.length === 0 || countries.includes(job.country);
        const cityMatch = cities.length === 0 || cities.includes(job.city);
        return countryMatch && cityMatch;
      });

      if (countries.length > 0) {
        state.cities = [
          ...new Set(
            state.jobs
              .filter((job) => countries.includes(job.country))
              .map((job) => job.city)
          ),
        ];
      } else {
        state.cities = [...new Set(state.jobs.map((job) => job.city))];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(GetAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs || [];
        state.status = action.payload.success;

        // Unique countries & cities
        state.countries = [...new Set(state.jobs.map((job) => job.country))];
        state.cities = [...new Set(state.jobs.map((job) => job.city))];

        state.filteredJobs = state.jobs; // default all jobs
      })
      .addCase(GetAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      })
      .addCase(CreateJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload.data);
      });
  },
});

export const { filterJobs } = jobSlice.actions;
export default jobSlice.reducer;
