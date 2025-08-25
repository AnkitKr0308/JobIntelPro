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
      return { success: true, jobs: result.jobs };
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

export const fetchGetJobById = async (jobId) => {
  try {
    const response = await fetch(`${baseUrl}/jobs/job/${jobId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch job details",
      };
    }
  } catch (e) {
    console.error("Error fetching job by ID:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${baseUrl}/jobs/countries`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const result = await response.json();

    if (response.ok) {
      return { success: true, countries: result.countries || [] };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch countries",
      };
    }
  } catch (e) {
    console.error("Error fetching countries:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchCities = async (countries = []) => {
  try {
    let url = `${baseUrl}/jobs/cities`;

    if (countries.length > 0) {
      const query = countries
        .map((c) => `countries=${encodeURIComponent(c)}`)
        .join("&");
      url += `?${query}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, cities: result.cities || [] };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch cities",
      };
    }
  } catch (e) {
    console.error("Error fetching cities:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchSearchJobs = async ({
  query = "",
  countries = [],
  cities = [],
}) => {
  try {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (countries.length > 0) params.append("country", countries.join(","));
    if (cities.length > 0) params.append("city", cities.join(","));

    const response = await fetch(
      `${baseUrl}/jobs/searchjobs?${params.toString()}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return { success: true, jobs: result.jobs || [] };
    } else {
      return { success: false, message: result.message || "Job search failed" };
    }
  } catch (e) {
    console.error("Error searching jobs:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};
