import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <div className="flex w-full py-5">
      <Logo />
      <div className="w-5/6  flex items-center">
        <Searchbar />
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
