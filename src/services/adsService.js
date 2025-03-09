import axios from "axios";

export const getAds = async () => {
  try {
    const response = await axios.get("https://ecommerce-gh8q.onrender.com/api/ads/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};
