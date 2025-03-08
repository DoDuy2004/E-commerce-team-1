import axios from "axios";

export const getAds = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/ads/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};
