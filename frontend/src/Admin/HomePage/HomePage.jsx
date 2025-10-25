import React, { useState, useEffect } from "react";
import "./HomePage.css";
import AddJobForm from "../Job/job";
import ProductForm from "../Product/productForm";
import AddHome from "./AddHome";
import AddGallery from "./AddGallery";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Property from "../PropertyYacht/Property";
import ContactGet from "../ContactGet/ContactGet";

export const HomePage = () => {
  // Step 1: Check localStorage for the activeTab value
  const storedTab = localStorage.getItem("activeTab");

  // Step 2: Initialize the activeTab state
  const [activeTab, setActiveTab] = useState(storedTab || "home");

  // Step 3: Handle tab click and save activeTab to localStorage
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); // Save active tab to localStorage
  };

  return (
    <>
      <Navbar />
      <div className="tabs-section">
        <div className="container">
          <div className="tabs-container">
            <h1>Admin Panel</h1>
            <div className="tabs" role="tab" aria-label="tabs">
              <button
                className={`btn ${activeTab === "home" ? "active" : ""}`}
                onClick={() => handleTabClick("home")}
              >
                Home
              </button>
              <button
                className={`btn ${activeTab === "jobs" ? "active" : ""}`}
                onClick={() => handleTabClick("jobs")}
              >
                Jobs
              </button>
              <button
                className={`btn ${activeTab === "products" ? "active" : ""}`}
                onClick={() => handleTabClick("products")}
              >
                Products
              </button>
              <button
                className={`btn ${activeTab === "property" ? "active" : ""}`}
                onClick={() => handleTabClick("property")}
              >
                Property
              </button>
              <button
                className={`btn ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => handleTabClick("contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the active tab's content */}
      {activeTab === "home" && (
        <>
          <AddHome />
          <AddGallery />
        </>
      )}

      {activeTab === "jobs" && <AddJobForm />}

      {activeTab === "products" && <ProductForm />}
      {activeTab === "property" && <Property/>}
      {activeTab === "contact" && <ContactGet/>}
      <Footer />
    </>
  );
};
