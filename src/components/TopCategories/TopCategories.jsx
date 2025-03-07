import React from "react";
import { getCategories } from "../../services/categoryService";
import { useState, useEffect } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";

const TopCategories = ({ title }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      console.log(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-20">
      <h2 className="flex justify-between text-2xl font-bold tracking-tight text-gray-900 mb-10">
        {title}
        <Link to="/404">
          <span
            className="text-base font-semibold cursor-pointer"
          >
            See All
          </span>
        </Link>
      </h2>
      <div className="flex justify-between">
        {categories &&
          categories.slice(0, 10).map((item, index) => {
            return <Category key={index} icon={item.icon} name={item.name} />;
          })}
      </div>
    </div>
  );
};

export default TopCategories;
