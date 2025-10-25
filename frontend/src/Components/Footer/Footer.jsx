import React from "react";
import "./Footer.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaMapMarkerAlt,
  FaAddressBook,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import footer_logo from "../../Assets/Navbar/yachts_logo.png";
import envelop from "../../Assets/Footer/envelope.png";
import phone from "../../Assets/Footer/phone.png";
import location from "../../Assets/Footer/location.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer-container">
      <footer class="footer-section">
        <div class="container">
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <a href="index.html">
                      <img src={footer_logo} class="img-fluid" alt="logo" />
                    </a>
                  </div>
                  <div class="footer-text">
                    <p className="footer_content">
                      Asia Superyachts Ltd was formed 25 years ago initially in
                      a beautiful beachfront restaurant in Bali Indonesia
                    </p>
                  </div>
                  <div class="footer-social-icon mb-5">
                    <span>Follow us</span>
                    <a href="#" className="icon_footer_back">
                      {" "}
                      <FaFacebookF className="icon_footer" />
                    </a>
                    <a href="#" className="icon_footer_back">
                      <FaTwitter className="icon_footer" />
                    </a>
                    <a href="#" className="icon_footer_back">
                      <FaInstagram className="icon_footer" />
                    </a>
                    <a href="#" className="icon_footer_back">
                      <FaPinterest className="icon_footer" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12  mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Quick Links</h3>
                  </div>
                  <ul className="footer_ul">
                    <Link to="/">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          Home
                        </a>
                      </li>
                    </Link>
                    <Link to="/about-us">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          About Us
                        </a>
                      </li>
                    </Link>
                    <Link to="/contact-us">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          Contact Us
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12  mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Yachts</h3>
                  </div>
                  <ul className="footer_ul">
                    <Link to="/charter-yachts">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          Charter for sale
                        </a>
                      </li>
                    </Link>
                    <Link to="/yacht-for-sale">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          Yachts for sale
                        </a>
                      </li>
                    </Link>
                    <Link to="/property-for-sale">
                      <li className="footer_li">
                        <a href="#" className="footer_conetnt_css">
                          Property for sale
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12  mb-50">
                <div className="img_title mb-4">
                  <img src={phone} alt="" />
                  <div className="d-grid">
                    <span className="phone_css">Phone</span>
                    <a href="tel:+66649913606" className="phone_css">
                      Thailand +66 649913606
                    </a>
                  </div>
                </div>
                <div className="img_title mb-4">
                  {" "}
                  <img src={envelop} alt="" />
                  <div className="d-grid">
                    <span className="phone_css">Email</span>
                    <a href="mailto:info@asiasuperyachts.com" className="phone_css">
                      info@asiasuperyachts.com
                    </a>
                  </div>
                </div>
                <div className="img_title">
                  {" "}
                  <img src={location} alt="" />
                  <div className="d-grid">
                    <span className="phone_css">Address</span>
                    <span className="phone_css">
                      7 Bell Yard, London United Kingdom
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="">
                <div class="copyright-text">
                  <span className="copyright">
                    Copyright © 2024. All rights reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
