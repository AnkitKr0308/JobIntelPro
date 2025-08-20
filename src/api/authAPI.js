import conf from "../conf/conf.js";

const baseUrl = conf.jobintelpro_base_url;

export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt_token");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
};

// Helper function to safely parse JSON
const safeJson = async (response) => {
  try {
    return await response.json();
  } catch (err) {
    return {
      success: false,
      message: `Invalid JSON response: ${response.statusText}`,
    };
  }
};

export const fetchSignup = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });

    const result = await safeJson(response);

    if (response.ok && result.success) {
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message || "Signup failed" };
    }
  } catch (e) {
    console.error("Error during signup:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchLogin = async (credentials) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    });

    const result = await safeJson(response);

    if (response.ok && result.success) {
      localStorage.setItem("jwt_token", result.token);
      return { success: true, data: result.user };
    } else {
      return {
        success: false,
        message: result.message || "Invalid credentials",
      };
    }
  } catch (e) {
    console.error("Error logging in:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};

export const fetchLogout = async () => {
  localStorage.removeItem("jwt_token");
  return { success: true };
};
