import React, { useEffect, useState } from "react";
import "./Hero.css";
import back from "../../Assets/Hero/1back.png";
import yacht from "../../Assets/Hero/yatch.png";
import circle from "../../Assets/Hero/circle.png";
import vector from "../../Assets/Hero/Vector.png";
import back2 from "../../Assets/Hero/2back.png";
import back3 from "../../Assets/Hero/3back.png";
import doted from "../../Assets/Hero/doted.png";
import yellow from "../../Assets/Hero/yellow_circle.png";
import blue from "../../Assets/Hero/blue_circle.png";
import mix from "../../Assets/Hero/mix.png";
import backsmallyacht from "../../Assets/Hero/back1small.png";
import backsmallluxury from "../../Assets/Hero/back2small.png";
import backsmallcharter from "../../Assets/Hero/back3small.png";
import { Link } from "react-router-dom";
const Hero = () => {
  const text = "ASIA SUPERYACHTS";
  const [activeIndex, setActiveIndex] = useState(0);
  const [heading, setHeading] = useState("");
  const [typingText, setTypingText] = useState("");
  const [typingKey, setTypingKey] = useState(0);
  const headings = ["ASIA SUPERYACHTS", "ASIA SUPERYACHTS", "ASIA SUPERYACHTS"];
  const typingTexts = [
    '"Your Gateway to Asia\'s Finest Yachts"',
    "“Creating unforgettable experiences”",
    "“Live a life of no limits”",
  ];
  const data = [
    {
      img: yacht,
      heading: "Yacht for sale",
      content: "Sail the Seas of Elegance",
      path: "/yacht-for-sale",
      background_img: backsmallyacht,
    },
    {
      img: circle,
      heading: "Charter Yachts",
      content: "Where Luxury Meets the Horizon",
      path: "/charter-yachts",
      background_img: backsmallcharter,
    },
    {
      img: vector,
      heading: "Luxury Villa",
      content: "Navigate Your Dreams in Luxury",
      path: "/property-for-sale",
      background_img: backsmallluxury,
    },
  ];

  useEffect(() => {
    const heroSlider = document.getElementById("heroSlider");

    const onSlide = (e) => {
      setActiveIndex(e.to);
      setHeading(headings[e.to]);
      setTypingText(typingTexts[e.to]);
      setTypingKey((prevKey) => prevKey + 1);
    };

    heroSlider.addEventListener("slid.bs.carousel", onSlide);
    setHeading(headings[0]);
    setTypingText(typingTexts[0]);

    return () => {
      heroSlider.removeEventListener("slid.bs.carousel", onSlide);
    };
  }, []);

  return (
    <div className="hero-container">
      <div
        id="heroSlider"
        className="carousel slide position-relative"
        data-bs-ride="carousel"
        data-bs-pause="false"
      >
        {/* Slider Items */}
        <div className="carousel-inner caresoul-inner_internal">
          <div className="carousel-item active" data-bs-interval="5000">
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${back})` }}
            ></div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${back2})` }}
            ></div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${back3})` }}
            ></div>
          </div>
        </div>
        <div className="center-heading">
          <img src={blue} className="blue_circle" />
          <img src={yellow} className="yellow_circle" />
          <img src={mix} className="mix_circle" />
          <h1 className="asia_super">
            {/* {heading.split("").map((letter, index) => (
              <span key={index} style={{ "--i": index + 1 }}>
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))} */}
            {heading}
          </h1>

          <div className="wrapper">
            <div key={typingKey} className="typing-demo">
              {typingText}
            </div>
          </div>
        </div>
        {/* Slider Navigation Buttons */}
        <div className="slider-nav position-absolute top-50 translate-middle-y">
          <div
            className={`slider-button ${activeIndex === 0 ? "active" : ""}`}
            data-bs-target="#heroSlider"
            data-bs-slide-to="0"
          ></div>
          <div
            className={`slider-button ${activeIndex === 1 ? "active" : ""}`}
            data-bs-target="#heroSlider"
            data-bs-slide-to="1"
          ></div>
          <div
            className={`slider-button ${activeIndex === 2 ? "active" : ""}`}
            data-bs-target="#heroSlider"
            data-bs-slide-to="2"
          ></div>
        </div>

        {/* Bottom Section with 3 Boxes */}
        <div className="box-container1">
          <img src={doted} alt="" className="doted_css" />
        </div>
        <div className="box-container">
          {data.map((item, index) => (
            <div
              className="box"
              key={index}
              style={{
                backgroundImage: item.background_img
                  ? `url(${item.background_img})`
                  : "none", // Set to 'none' if there's no image

                backgroundSize: "cover", // Cover to fill the box
                backgroundPosition: "center", // Center the background image
              }}
            >
              <div className="box_content_img">
                <img src={item.img} alt={item.heading} />
              </div>
              <p className="box_content">{item.heading}</p>
              <div className="box_multiple">
                <p className="mutiple_one">{item.content}</p>
                <Link to={item.path} className="explore_hero_main">
                  <span className="mutiple_two">Explore</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
