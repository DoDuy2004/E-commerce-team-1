import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <img
          className="h-12 w-auto"
          src="/images/logo.jpg"
          alt="ACCESSED Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
