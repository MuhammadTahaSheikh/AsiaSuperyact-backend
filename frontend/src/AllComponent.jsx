import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Gallery from "./Components/Gallery/Gallery";
import Reach from "./Components/ReachOut/Reach";
import Book from "./Components/BookNow/Book";
import Footer from "./Components/Footer/Footer";
import Sale from "./Components/SaleYacht/Sale";
import AboutUs from "./Components/about-us/about";
import Catalog from "./Components/Catalog/Catalog";
import Contact from "./Components/ContactUs/Contact";

import Hero from "./Components/HeroSection/Hero";
function AllComponent({ mySectionRef,handleEnquireClick}) {

  // Function to scroll to the component


  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Show the scroll-to-top button when the user has scrolled down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div>
      <Navbar handleEnquireClick={handleEnquireClick} />
      <Hero />
      <AboutUs />
      <Sale handleEnquireClick={handleEnquireClick}/>

      <Book mySectionRef={mySectionRef}/>

      <Reach />
      <Gallery />
      <Footer />
    </div>
  );
}

export default AllComponent;
