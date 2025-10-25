import React, { useEffect, useState } from "react";
import Book from "../BookNow/Book";
import Reach from "../ReachOut/Reach";
import Gallery from "../Gallery/Gallery";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AboutUs from "../about-us/about";
import { Link } from "react-router-dom";
import BoatTravelling from "./BoatTravelling";
import Step from "./Step";
import OfferAbout from "./OfferAbout";
function About({ mySectionRef, handleEnquireClick }) {
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
      <div className="contact_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">About Us</p>
          <div className="text-center pb-5">
            {" "}
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_contact">About Us</span>
          </div>
        </div>
      </div>

      <AboutUs />
      <BoatTravelling handleEnquireClick={handleEnquireClick}  />
      <Step />
      <OfferAbout handleEnquireClick={handleEnquireClick} />
      <Book mySectionRef={mySectionRef} />
      <Reach />
      <Gallery />
      <Footer />
    </div>
  );
}

export default About;
