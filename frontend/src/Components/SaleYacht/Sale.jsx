import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import "./Sale.css";
import axios from "axios";
import ship1 from "../../Assets/Catalog/data1.png";

function Sale({ handleEnquireClick }) {
  const [yachtsData, setYachtsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // For fade-in effect
  const detailRef = useRef(null); // Reference for the detail div

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/hot-products")
      .then((response) => {
        setYachtsData(response?.data?.data?.slice(1, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (detailRef.current) {
        observer.observe(detailRef.current);
      }

      return () => {
        if (detailRef.current) {
          observer.unobserve(detailRef.current);
        }
      };
    }
  }, [loading, detailRef]);

  const handleDetailClick = (id) => {
    axios
      .get(`/api/product/${id}`)
      .then((response) => {
        navigate("/detail-page", { state: { product: response.data.data } });
      })
      .catch((error) => {
        console.error("Error fetching the product details:", error);
      });
  };
  return (
    <>
      <div className="sale-container" ref={detailRef}>
        <div className="background_sale">
          <h1 className="sale_head pt-5">Yachts For Sale!</h1>
          <p className="sale_para pb-5">
            Every yacht enthusiast expects more from yacht rental company.
            Rental site has to be <br />
            pleasant to the eye and fully enabled for many testimonial features.
          </p>
          {loading ? (
            <div className="loader-container">
              <CircularProgress />
            </div>
          ) : (
            yachtsData &&
            yachtsData.map((yacht, yachtIndex) => (
              <div className="row row_sale m-0 yachts_position" key={yacht.id}>
                {yachtIndex === 1 ? (
                  <>
                    {/* Image Carousel first */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0 m-0">
                      <Carousel>
                        {yacht.imageURL
                          .split(",")
                          ?.slice(0, 4)
                          ?.map((image, index) => (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100"
                                src={image}
                                alt={`Slide ${index + 1}`}
                              />
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3 ">
                      <div
                        className={`detail_All  ${
                          visible ? "slide-in-up" : ""
                        }`}
                      >
                        <h1 className="sale_heading">{yacht.title}</h1>
                        <p
                          className="sale_content"
                          title={yacht.displayedDescription}
                        >
                          {yacht.displayedDescription}
                        </p>
                        <div className="main_out_div mt-4">
                          <div className="main_in_div">
                            {" "}
                            <span className="price_css">Price:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.price} {yacht.currency_type}
                            </span>
                          </div>
                        </div>
                        <div className="main_out_div mt-4 row row_sale">
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Guests:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.guests || "N/A"}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Cabins:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.cabins || "N/A"}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Crew:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.crew || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="main_out_div mt-4 mb-5 row row_sale">
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css_upd">Year:</span>{" "}
                            <span className="Price_conetent">
                              {yacht?.year || "N/A"}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Length:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.length || "N/A"}
                            </span>
                          </div>
                          <div className="main_in_div col-4"></div>
                         
                        </div>
                        <div className="">
                          <button
                            className="sale_deatil_btn"
                            onClick={() => handleDetailClick(yacht.id)}
                          >
                            DETAILS
                          </button>
                          <button
                            className="sale_meeting_btn"
                            onClick={handleEnquireClick}
                          >
                            ENQUIRE
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Normal row row_sale for other yachts
                  <>
                    {/* Details Section first */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3 ">
                      <div
                        className={`detail_All  ${
                          visible ? "slide-in-up" : ""
                        }`}
                      >
                        <h1 className="sale_heading">{yacht.title}</h1>
                        <p className="sale_content">{yacht.description}</p>
                        <div className="main_out_div mt-4">
                          <div className="main_in_div">
                            {" "}
                            <span className="price_css">Price:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.price} {yacht.currency_type}
                            </span>
                          </div>
                        </div>
                        <div className="main_out_div mt-4 row row_sale">
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Guest:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.guests || "N/A"}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Cabins:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.cabins}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Crew:</span>{" "}
                            <span className="Price_conetent">{yacht.crew}</span>
                          </div>
                        </div>
                        <div className="main_out_div mt-4 mb-5 row row_sale">
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css_upd">Year:</span>{" "}
                            <span className="Price_conetent">
                              {yacht?.year}
                            </span>
                          </div>
                          <div className="main_in_div col-4">
                            {" "}
                            <span className="price_css">Length:</span>{" "}
                            <span className="Price_conetent">
                              {yacht.length}
                            </span>
                          </div>
                          <div className="main_in_div col-4"></div>
                        
                        </div>
                        <div className="">
                          <button
                            className="sale_deatil_btn"
                            onClick={() => handleDetailClick(yacht.id)}
                          >
                            DETAILS
                          </button>
                          <button
                            className="sale_meeting_btn"
                            onClick={handleEnquireClick}
                          >
                            ENQUIRE
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Carousel second */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 p-0 m-0">
                      <Carousel>
                        {yacht.imageURL
                          .split(",")
                          ?.slice(0, 4)
                          ?.map((image, index) => (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100"
                                src={image}
                                alt={`Slide ${index + 1}`}
                              />
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Sale;
