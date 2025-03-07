import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <div className="flex py-3 justify-between gap-20 fixed top-0 z-50 bg-white">
      <Logo />
      <div className="w-5/6 flex items-center gap-4">
        <Searchbar />
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
