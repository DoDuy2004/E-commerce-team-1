import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import { ProductCard } from "../components/Product/ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { categoryName } = location.state || {};
  const categoryID = queryParams.get("categoryID");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(categoryID);
      setProducts(data);
      //   console.log(data);
    };
    fetchProducts();
  }, [categoryID]);

  return (
    <div className="py-10 mt-10 lg:mt-0">
      <h1 className="mb-5 flex gap-4 items-center">
        <span className="text-xl font-semibold">{categoryName}</span>{" "}
        {products.length} products
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {products &&
          products.map((item, index) => {
            return <ProductCard key={index} product={item} />;
          })}
      </div>
    </div>
  );
};

export default Product;
