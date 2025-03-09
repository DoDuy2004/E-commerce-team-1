import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import { ProductCard } from "../components/Product/ProductCard";

const Product = () => {
  const [products, setProducts] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
    const categoryID = queryParams.get("categoryID");
    
    console.log(categoryID);

    return <div>
      
  </div>;
};

export default Product;
