import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCreateJob, fetchGetAllJobs } from "../api/jobsAPI";

export const CreateJob = createAsyncThunk("job/createJob", async (jobData) => {
  const response = await fetchCreateJob(jobData);
  return response;
});

export const GetAllJobs = createAsyncThunk("job/getAllJobs", async () => {
  const response = await fetchGetAllJobs();
  return response;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    data: {},
    error: null,
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = action.payload.success;
      })
      .addCase(CreateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      })
      .addCase(GetAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || {};
        state.status = action.payload.success;
      })
      .addCase(GetAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = false;
      });
  },
});

export default jobSlice.reducer;
