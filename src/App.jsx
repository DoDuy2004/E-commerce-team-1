import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <>
      <div className="py-5 border-b-1 border-[#e8e8e8] px-16">
        <Header />
        <Navbar />
      </div>
      <Banner />
    </>
  );
}

export default App;
