import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
        <Navbar />
        <Banner />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
