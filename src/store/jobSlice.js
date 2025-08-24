import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchCountries,
  fetchCreateJob,
  fetchGetAllJobs,
  fetchGetJobById,
  fetchSearchJobs,
} from "../api/jobsAPI";

export const CreateJob = createAsyncThunk("job/createJob", async (jobData) => {
  const response = await fetchCreateJob(jobData);
  return response;
});

export const searchJobs = createAsyncThunk(
  "jobs/searchJobs",
  async ({ query = "", countries = [], cities = [] }, { rejectWithValue }) => {
    try {
      const result = await fetchSearchJobs({ query, countries, cities });
      if (result.success) return result.jobs;
      return rejectWithValue(result.message);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to search jobs");
    }
  }
);

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

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    filteredJobs: [],
    loading: false,
    error: null,
    countries: [],
    cities: [],
    data: {},
    status: false,
    filters: {
      countries: [],
      cities: [],
      search: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };

      let filtered = [...state.jobs];

      if (state.filters.countries.length > 0) {
        filtered = filtered.filter((job) =>
          state.filters.countries.includes(job.country)
        );
      }

      if (state.filters.cities.length > 0) {
        filtered = filtered.filter((job) =>
          state.filters.cities.includes(job.city)
        );
      }

      if (state.filters.search.trim() !== "") {
        filtered = filtered.filter((job) =>
          job.title.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }

      state.filteredJobs = filtered;
    },
    clearFilters: (state) => {
      state.filters = { countries: [], cities: [], search: "" };
      state.filteredJobs = state.jobs;
    },
  },

  extraReducers: (builder) => {
    builder
      // ✅ Get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetching jobs failed";
      })

      // ✅ Create job
      .addCase(CreateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateJob.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.jobs.push(action.payload.data);
          state.filteredJobs.push(action.payload.data);
        }
      })
      .addCase(CreateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      })

      // ✅ Get job by ID
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

      // ✅ Get countries
      .addCase(GetCountries.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.countries = action.payload.countries || [];
        }
      })
      .addCase(GetCountries.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // ✅ Get cities
      .addCase(GetCities.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cities = action.payload.cities || [];
        }
      })
      .addCase(GetCities.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // ✅ Search jobs
      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(searchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
      });
  },
});

export const { setFilters, clearFilters } = jobSlice.actions;
export default jobSlice.reducer;
