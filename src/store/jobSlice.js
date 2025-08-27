import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchCountries,
  fetchCreateJob,
  fetchGetAllJobs,
  fetchGetJobById,
  fetchSearchJobs,
} from "../api/jobsAPI";
import { setError, clearError } from "./uiSlice";

export const CreateJob = createAsyncThunk(
  "job/createJob",
  async (jobData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchCreateJob(jobData);
      if (!response.success) {
        dispatch(setError(response.message || "Job creation failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Job creation failed."));
      return rejectWithValue(err.message);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const result = await fetchGetAllJobs();
      if (!result.success) {
        dispatch(setError(result.message || "Fetching jobs failed"));
        return rejectWithValue(result.message);
      }
      dispatch(clearError());
      return result.jobs;
    } catch (err) {
      dispatch(setError("Fetching jobs failed."));
      return rejectWithValue(err.message);
    }
  }
);

export const GetJobById = createAsyncThunk(
  "job/getJobById",
  async (jobId, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchGetJobById(jobId);
      if (!response.success) {
        dispatch(setError(response.message || "Job not found"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Fetching job failed."));
      return rejectWithValue(err.message);
    }
  }
);

export const GetCountries = createAsyncThunk(
  "job/getCountries",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchCountries();
      if (!response.success) {
        dispatch(setError(response.message || "Fetching countries failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Fetching countries failed."));
      return rejectWithValue(err.message);
    }
  }
);

export const GetCities = createAsyncThunk(
  "job/getCities",
  async (countries = [], { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchCities(countries);
      if (!response.success) {
        dispatch(setError(response.message || "Fetching cities failed"));
        return rejectWithValue(response.message);
      }
      dispatch(clearError());
      return response;
    } catch (err) {
      dispatch(setError("Fetching cities failed."));
      return rejectWithValue(err.message);
    }
  }
);

export const searchJobs = createAsyncThunk(
  "job/searchJobs",
  async ({ query, countries, cities }, { rejectWithValue, dispatch }) => {
    try {
      const result = await fetchSearchJobs({ query, countries, cities });
      if (!result.success) {
        dispatch(setError(result.message || "Search failed"));
        return rejectWithValue(result.message);
      }
      dispatch(clearError());
      return result.jobs;
    } catch (err) {
      dispatch(setError("Search failed."));
      return rejectWithValue(err.message);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    filteredJobs: null,
    loading: false,
    countries: [],
    cities: [],
    data: {},
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
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

      .addCase(GetJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || {};
        state.status = action.payload.success;
      })

      .addCase(GetCountries.fulfilled, (state, action) => {
        state.countries = action.payload.countries || [];
      })

      .addCase(GetCities.fulfilled, (state, action) => {
        state.cities = action.payload.cities || [];
      })

      .addCase(searchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredJobs = action.payload;
      });
  },
});

export default jobSlice.reducer;
