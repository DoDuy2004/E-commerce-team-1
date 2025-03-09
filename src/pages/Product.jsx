import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import { ProductCard } from "../components/Product/ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryID = queryParams.get("categoryID");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(categoryID);
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, [categoryID]);

  return (
    <div className="py-10 mt-10 lg:mt-0">
      <div className=" mb-5 text-center leading-10">
        <h2 className="font-semibold text-4xl">Search</h2>
        <span>There are {products.length} products for search</span>
      </div>
      <p className="mb-5">
        Search results for <span className="font-semibold"></span>.
      </p>
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
