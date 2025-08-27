import conf from "../conf/conf.js";

const baseUrl = `${conf.jobintelpro_base_url}/subscription`;

export const fetchSubscribe = async (subscriptionData) => {
  try {
    const response = await fetch(`${baseUrl}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionData),
    });

    const result = await response.json();
    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Subscription failed",
      };
    }
  } catch (e) {
    console.error("Error during subscription:", e);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};
