import axios from "axios";

export const getProducts = async (keyword, categoryID) => {
  try {
    const response = await axios.get(
      `https://ecommerce-gh8q.onrender.com/api/products/search`,
      {
        params: {
          keyword,
          categoryID,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getSuggestions = async (keyword) => {
  try {
    const response = await axios.get(
      `https://ecommerce-gh8q.onrender.com/api/search/suggestions`,
      {
        params: {
          keyword,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
