import axios from "axios";


export const getProducts = async (keyword, categoryID) => {
  try {
      const response = await axios.get(`http://localhost:5000/api/products/search`, {
          params: {
              keyword,
              categoryID
        }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};