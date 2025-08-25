import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchCountries,
  fetchCreateJob,
  fetchGetAllJobs,
  fetchGetJobById,
  fetchSearchJobs,
} from "../api/jobsAPI";

// Async thunks
export const CreateJob = createAsyncThunk("job/createJob", async (jobData) => {
  const response = await fetchCreateJob(jobData);
  return response;
});

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetchGetAllJobs();
      if (result.success) return result.jobs;
      return rejectWithValue(result.message);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch jobs");
    }
  }
);

export const GetJobById = createAsyncThunk("job/getJobById", async (jobId) => {
  const response = await fetchGetJobById(jobId);
  return response;
});

export const GetCountries = createAsyncThunk("job/getCountries", async () => {
  const response = await fetchCountries();
  return response;
});

export const GetCities = createAsyncThunk(
  "job/getCities",
  async (countries = [], { rejectWithValue }) => {
    try {
      const response = await fetchCities(countries);
      if (response.success) return response;
      return rejectWithValue(response.message);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch cities");
    }
  }
);

export const searchJobs = createAsyncThunk(
  "job/searchJobs",
  async ({ query, countries, cities }, { rejectWithValue }) => {
    try {
      const result = await fetchSearchJobs({ query, countries, cities });
      if (result.success) return result.jobs;
      return rejectWithValue(result.message);
    } catch (err) {
      return rejectWithValue(err.message || "Search failed");
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [], // all jobs from backend
    filteredJobs: null, // null = no search yet
    loading: false,
    error: null,
    countries: [],
    cities: [],
    data: {},
    status: false,
  },
  reducers: {
    // No frontend-only filters
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        // Keep filteredJobs null initially
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetching jobs failed";
      })

      // Create job
      .addCase(CreateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateJob.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.jobs.push(action.payload.data);
          if (state.filteredJobs !== null) {
            state.filteredJobs.push(action.payload.data);
          }
        }
      })
      .addCase(CreateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      })

      // Get job by ID
      .addCase(GetJobById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || {};
        state.status = action.payload.success;
      })
      .addCase(GetJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      })

      // Get countries
      .addCase(GetCountries.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.countries = action.payload.countries || [];
        }
      })
      .addCase(GetCountries.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Get cities
      .addCase(GetCities.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cities = action.payload.cities || [];
        }
      })
      .addCase(GetCities.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Search jobs
      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredJobs = action.payload; // backend-driven
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
        state.filteredJobs = []; // empty on failure
      });
  },
});

export default jobSlice.reducer;
