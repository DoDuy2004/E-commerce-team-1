import axios from "axios";

const API_URL = "https://ecommerce-gh8q.onrender.com/api/categories";

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
