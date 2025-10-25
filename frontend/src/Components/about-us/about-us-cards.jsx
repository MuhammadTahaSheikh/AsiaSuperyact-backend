import React from "react";

import "./about-us.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaMapMarkerAlt,
  FaAddressBook,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Cards = () => {
  return (
    <div className="card-container">
      <div className="about-us-pic-1">
        <div className="content-border">
          <Link to="/charter-yachts">
            {/* <button className="about-us-button">Charter Yachts</button> */}
            <button class="about-us-button">
            Charter Yachts
    <span class="arrow">➔</span> 
</button>

          </Link>
          <p>We offer a wide range of private and private charter yachts.</p>
        </div>
      </div>
      <div className="about-us-pic-2">
        <div className="about-us-pic-2-top">
          <div className="content-border">
            <Link to="/yacht-for-sale">
              <button className="about-us-button">Yacht For Sale
              <span class="arrow">➔</span> 
              </button>
            </Link>
            <p>
              There is a wide range of yachts for customers to choose from at
              Yachts for sale.
            </p>
          </div>
        </div>
        <div className="about-us-pic-2-bottom">
          <h3>
            <i>Reach Out</i>
          </h3>
          <div className="about-us-social about-us-location">
            <FaMapMarkerAlt className="social-icon" />{" "}
             <p className="reach_about_content"> 7 Bell Yard, London United Kingdom</p>
          </div>
          <div className="about-us-social about-us-email">
            <FaEnvelope className="social-icon" />{" "}
             <p className="reach_about_content"> info@asiasuperyachts.com</p>
          </div>
          <div className="about-us-social about-us-phone">
            <FaPhoneAlt className="social-icon" />  <p className="reach_about_content"> +66 649913606</p>
          </div>
        </div>
      </div>
      <div className="about-us-pic-3">
        <div className="content-border">
          <Link to="/property-for-sale">
            <button className="about-us-button">Luxury Villa
            <span class="arrow">➔</span> 
            </button>
          </Link>
          <p>We have Property for sale and sales service.</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
