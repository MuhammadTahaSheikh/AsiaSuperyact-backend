import React from "react";
import "./Navbar.css";
import logo from "../../Assets/Navbar/yachts_logo.png";

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
import { Link, useLocation } from "react-router-dom";

function Navbar({ handleEnquireClick }) {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "active" : "");
  const isDropdownActive = () =>
    location.pathname === "/looking-for-job" ||
    location.pathname === "/looking-for-crew";

  return (
    <>
      <div className="navbar-container sticky-top">
        <div className="row m-0 ">
          <div className="col-xl-3 col-lg-3 col-md-5 col-sm-2 col- img_padding">
            <div className="logo_div">
              <Link to="/">
                <img src={logo} alt="yachts_logo" className="yachts_logo" />
              </Link>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-2 col- p-0">
            <div className="top_head">
              <div className="contact-info">
                <FaMapMarkerAlt className="icon" />
                <span className="location">
                  7 Bell Yard, London United Kingdom
                </span>
                <FaEnvelope className="icon" />
                <a
                  href="mailto:info@asiasuperyachts.com"
                  className="phone_css_nav"
                >
                  {" "}
                  <span>info@asiasuperyachts.com</span>
                </a>
              </div>

              <div className="social-iconss">
                <span className="contact-info">
                  <FaPhoneAlt className="icon" />
                  <span>
                    Make a Call{" "}
                    <a href="tel:+66649913606" className="phone_css_nav">
                      +66 649913606
                    </a>
                  </span>
                </span>
                <div className="icon-group">
                  <FaGoogle className="social-icona" />
                  <FaFacebookF className="social-icona" />
                  <FaTwitter className="social-icona" />
                  <FaLinkedinIn className="social-icona" />
                </div>
              </div>
            </div>
            <hr className="m-0 line_straight" />
            <div className="nabvar_main">
              <nav className="navbar navbar-expand-lg navbar-light p-0 navbar_main_sec">
                <div className="">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <div>
                      <ul className="navbar-nav">
                        <Link to="/" className="link_css">
                          <li className={`nav-item ${isActive("/")}`}>
                            <a
                              className="nav-link"
                              aria-current="page"
                              href="#"
                            >
                              HOME
                            </a>
                          </li>
                        </Link>
                        <Link to="/yacht-for-sale" className="link_css">
                          <li
                            className={`nav-item ${isActive(
                              "/yacht-for-sale"
                            )}`}
                          >
                            <a className="nav-link" href="#">
                              YACHTS FOR SALE
                            </a>
                          </li>
                        </Link>
                        <Link to="/charter-yachts" className="link_css">
                          <li
                            className={`nav-item ${isActive(
                              "/charter-yachts"
                            )}`}
                          >
                            <a className="nav-link" href="#">
                              CHARTER YACHTS
                            </a>
                          </li>
                        </Link>
                        <Link to="/property-for-sale" className="link_css">
                          <li
                            className={`nav-item ${isActive(
                              "/property-for-sale"
                            )}`}
                          >
                            <a className="nav-link" href="#">
                              PROPERTY FOR SALE
                            </a>
                          </li>
                        </Link>
                        <div className="nav-item dropdown">
                          {/* CREW Link */}
                          <Link
                            to=""
                            className={`link_css ${
                              isDropdownActive() ? "active" : ""
                            }`}
                          >
                            <a className="nav-link">CREW</a>
                          </Link>

                          {/* Dropdown menu */}
                          <div className="dropdown-menu">
                            <div className="dropdown-content">
                              <Link
                                to="/looking-for-job"
                                className="dropdown-item"
                              >
                                Looking for Job
                              </Link>
                              <Link
                                to="/looking-for-crew"
                                className="dropdown-item"
                              >
                                Looking for Crew
                              </Link>
                            </div>
                          </div>
                        </div>

                        <Link to="/about-us" className="link_css">
                          <li className={`nav-item ${isActive("/about-us")}`}>
                            <a className="nav-link" href="#">
                              ABOUT US
                            </a>
                          </li>
                        </Link>
                        <Link to="/contact-us" className="link_css">
                          <li className={`nav-item ${isActive("/contact-us")}`}>
                            <a className="nav-link" href="#">
                              CONTACT US
                            </a>
                          </li>
                        </Link>
                        {/* <li className="nav-item d-lg-none">
                          {" "}
                          <button className="btn_enquiry">ENQUIRY NOW</button>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="d-none d-lg-flex align-items-center">
                {" "}
                <button onClick={handleEnquireClick} className="btn_enquiry">
                  ENQUIRY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
