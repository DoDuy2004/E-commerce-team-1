import { useState, useEffect, useRef } from "react";
import { getCategories } from "../../services/categoryService";
import Logo from "./Logo";
import MobileMenuToggle from "./MobileMenuToggle";
import Searchbar from "./Searchbar";
import UserActions from "./UserActions";
import Navbar from "../Navbar/Navbar";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Today's Deals", href: "/deals" },
  { name: "Customer Services", href: "/customer-service" },
  { name: "Trending Products", href: "/trending" },
  { name: "Blog", href: "/blog" },
  { name: "Special Offers", href: "/offers" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <header className="w-full border-b border-gray-200">
      {/* Top Bar */}
      <div className="container min-w-full mx-auto px-16 bg-white fixed top-0 z-50">
        <div className="flex flex-wrap items-center justify-between py-4">
          {/* Logo */}
          <Logo />

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

          {/* Search Bar */}
          <Searchbar categories={categories} />

          {/* User Actions */}
          <UserActions />
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu toggleMenu={toggleMenu} navLinks={navLinks} categories={categories} />}
    </header>
  );
};

export default Header;
