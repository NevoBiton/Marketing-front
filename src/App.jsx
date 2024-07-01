import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios"
import HomePage from "../pages/HomePage";
import ProductFeedPage from "../pages/ProductFeedPage";
import TopNavBar from "../components/TopNavBar";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import AddProductPage from "../pages/AddProductPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { UserProvider } from "./contexts/UserContext";
import UserProfilePage from "../pages/UserProfilePage";

const PRODUCTS_URL = "http://localhost:3000/api/product"

function App() {

  return (
    <>

      <Router>
        <UserProvider>
          <TopNavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductFeedPage />} />
            <Route path="/product/:productId" element={< ProductDetailsPage />} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="*" element={< NotFoundPage />} />
          </Routes>
        </UserProvider>
      </Router>



    </>
  )
}

export default App
