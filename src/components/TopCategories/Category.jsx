import React from "react";
import { Link } from "react-router-dom";

const Category = ({ icon, name }) => {
  return (
    <Link to="/White-page">
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-25 h-25 flex justify-center items-center rounded-full bg-[#efefef]">
          <img className="w-1/2" src={icon} alt="" />
        </div>
        <span className="text-sm">{name}</span>
      </div>
    </Link>
  );
};

export default Category;
