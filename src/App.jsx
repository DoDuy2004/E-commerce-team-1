import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import WhitePage from "./pages/WhitePage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
      <Navbar />
        <Routes>
          <Route path="/404" element={<WhitePage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
