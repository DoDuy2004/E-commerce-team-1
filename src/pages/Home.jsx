import React from "react";
import { ProductCard } from "../components/Product/ProductCard";
import { ListProduct } from "../components/Product/ListProduct";
import { productItem } from "../data";
import { Button } from "../components/Button";
import Banner from "../components/Banner/Banner";
import TopCategories from "../components/TopCategories/TopCategories";
import { TopSelling } from "../components/Product/TopSelling";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const nav = useNavigate()
  const navigate = () => {
    nav("/white-page")
  }
  return (
    <div>
      <Banner />
      <TopCategories title={"Our Top Categories"} />
      <ListProduct title={"Popular Products 2023"} productList={productItem} />
      <ListProduct title={"Furniture Collection"} productList={productItem} />
      <ListProduct title={"New Shoes Collection"} productList={productItem} />
      <div className="flex justify-center items-center my-20">
        <Button style={"bg-black text-white px-5 py-3 rounded-3xl cursor-pointer"} content={"See more product"} clickEvent={navigate}/>
      </div>
      <TopSelling/>
    </div>
  );
};
