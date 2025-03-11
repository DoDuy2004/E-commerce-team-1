import axios from "axios";
import { API_URL } from "./API";

export const getShopInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}shops/67cffefacac2301d4f074aad`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
};
