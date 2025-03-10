import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <div className="px-16">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/today-deals" element={<TodayDeals />}></Route>
            <Route path="/special-offers" element={<SpecialOffers />}></Route>
            <Route
              path="/trending-products"
              element={<TrendingProducts />}
            ></Route>
            <Route
              path="/customer-services"
              element={<CustomerServices />}
            ></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/search" element={<SearchProducts />}></Route>
            <Route path="/products" element={<Product />}></Route>
            <Route
              path="/product-detail/:id"
              element={<ProductDetail />}
            ></Route>
            <Route path="/white-page" element={<WhitePage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

export default App;
