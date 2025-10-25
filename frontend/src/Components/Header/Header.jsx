import React, { useState } from "react";
import "./Header.css";
import logo from "../../Assets/Header/logo.svg";
import location from "../../Assets/Header/icon-location.svg";
import mail from "../../Assets/Header/icon-mail.svg";
import phone from "../../Assets/Header/icon-phone.svg";
import google from "../../Assets/Header/icon-google.svg";
import pinterest from "../../Assets/Header/icon-pinterest.svg";
import twitter from "../../Assets/Header/icon-twitter.svg";
import facebook from "../../Assets/Header/icon-fb.svg";
import linkedin from "../../Assets/Header/icon-linkedin.svg";
import hamburger from "../../Assets/Header/hamburger.svg";
import close from "../../Assets/Header/close.svg";

export const Header = () => {
  const [toggler, setToggler] = useState(false);

  const hamburgerToggle = () => {
    setToggler((prev) => !prev);
  };

  return (
    <div>
      <div className="container">
        <div className="header flex">
          <div className="logo-container">
            <img className="logo" src={logo} alt="#" />
          </div>

          <div className="nav-container">
            <div className="contact-container flex">
              <div className="contact-container-one flex">
                <a href="">
                  <img
                    className="contact-container-icons"
                    src={location}
                    alt=""
                  />
                  Richardson, California 62639
                </a>
                <a className="email" href="">
                  <img className="contact-container-icons" src={mail} alt="" />
                  theraheel10@gmail.com
                </a>
              </div>
              <div className="socials-container">
                <a className="call-cta flex" href="">
                  <img src={phone} alt="" />
                  Make a Call <span>+36 55 540 069</span>
                </a>
                <div className="icons flex">
                  <a className="social-icons" href="">
                    <img src={google} alt="" />
                  </a>
                  <a className="social-icons" href="">
                    <img src={pinterest} alt="" />
                  </a>
                  <a className="social-icons" href="">
                    <img src={twitter} alt="" />
                  </a>
                  <a className="social-icons" href="">
                    <img src={facebook} alt="" />
                  </a>
                  <a className="social-icons" href="">
                    <img src={linkedin} alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`nav-list-container flex ${
                toggler ? "toggle-flex" : "toggle-none"
              }`}
            >
              <ul className="nav-list flex">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">YACHTS FOR SALE</a>
                </li>
                <li>
                  <a href="">CHARTER</a>
                </li>
                <li>
                  <a href="">PROPERTY FOR SALE</a>
                </li>
                <li>
                  <a href="">ABOUT US</a>
                </li>
                <li>
                  <a href="">CONTACT US</a>
                </li>
              </ul>
              <a className="nav-list-btn">ENQUIRE NOW</a>
            </div>
          </div>
          <a className="toggle-icon" onClick={hamburgerToggle}>
            <img src={toggler ? close : hamburger} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};
