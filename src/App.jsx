import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Footer } from "./components/Footer/Footer";
import WhitePage from "./pages/WhitePage";
import { ScrollToTop } from "./utils/ScrollToTop";
import SearchProducts from "./pages/SearchProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <div className="px-16">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<SearchProducts />}> </Route>
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
