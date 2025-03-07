import React from "react";
import { ProductCard } from "../components/ProductCard";
import { ListProduct } from "../components/ListProduct";
import { productItem } from "../data";
import { Button } from "../components/Button";
import Banner from "../components/Banner/Banner";
import TopCategories from "../components/TopCategories/TopCategories";

export const Home = () => {
  return (
    <div>
      <Banner />
      <TopCategories title={"Our Top Categories"} />
      <ListProduct title={"Popular Products 2023"} productList={productItem} />
      <ListProduct title={"Furniture Collection"} productList={productItem} />
      <ListProduct title={"New Shoes Collection"} productList={productItem} />
      <div className="flex justify-center items-center my-20">
        <Button />
      </div>
    </div>
  );
};
