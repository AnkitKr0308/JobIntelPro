import conf from "../conf/conf.js";
import { getAuthHeaders } from "./authAPI.js";

const baseUrl = conf.jobintelpro_base_url;

export const fetchCreateJob = async (jobData) => {
  try {
    const response = await fetch(`${baseUrl}/jobs/createjob`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    const result = await response.json();
    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Job creation failed",
      };
    }
  } catch (e) {
    console.error("Error creating job:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchGetAllJobs = async () => {
  try {
    const response = await fetch(`${baseUrl}/jobs/alljobs`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch jobs",
      };
    }
  } catch (e) {
    console.error("Error fetching jobs:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};
