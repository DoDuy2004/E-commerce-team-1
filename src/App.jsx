import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Footer } from "./components/Footer/Footer";
import WhitePage from "./pages/WhitePage";
import { ScrollToTop } from "./utils/ScrollToTop";
import SearchProducts from "./pages/SearchProducts";
import Product from "./pages/Product";
import TodayDeals from "./pages/TodayDeals";
import SpecialOffers from "./pages/SpecialOffers";
import TrendingProducts from "./pages/TrendingProducts";
import CustomerServices from "./pages/CustomerServices";
import Blog from "./pages/Blog";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={isLoginPage ? "w-full min-h-screen" : ""}>
      {!isLoginPage && <Header />}
      <ScrollToTop />
      <div className={isLoginPage ? "w-full" : "px-16"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today-deals" element={<TodayDeals />} />
          <Route path="/special-offers" element={<SpecialOffers />} />
          <Route path="/trending-products" element={<TrendingProducts />} />
          <Route path="/customer-services" element={<CustomerServices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/white-page" element={<WhitePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {!isLoginPage && <Footer className="w-full" />}
    </div>
  );
}

export default App;
