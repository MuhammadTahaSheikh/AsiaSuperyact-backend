import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import "./Catalog.css"; // Import your CSS file
import ship1 from "../../Assets/Catalog/data1.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Book from "../BookNow/Book";
import Reach from "../ReachOut/Reach";
import Gallery from "../Gallery/Gallery";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
const Catalog = ({ mySectionRef, handleEnquireClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/yacht-for-sale-products");
        console.log("object response check", response);
        const products = response.data.data.map((product) => ({
          title: product.title,
          price: product.price,
          currency_type:product.currency_type,
          guests: product.guests,
          cabins: product.cabins,
          crew: product.crew,
          year: product.year,
          length: product.length,
          // perk: product.perk,
          id_send: product.id,
          categoryID: product.categoryID,
          images: product.imageURL.split(","),
        }));
        setContentData(products);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDetailClick = (id) => {
    axios
      .get(`/api/product/${id}`) // Fetch the specific product details
      .then((response) => {
        // Navigate to the detail page and pass the product data
        navigate("/detail-page", { state: { product: response.data.data } });
      })
      .catch((error) => {
        console.error("Error fetching the product details:", error);
      });
  };
  // const filteredProducts = contentData.filter(
  //   (product) => product.categoryID == 1
  // );

  return (
    <>
      <Navbar handleEnquireClick={handleEnquireClick} />
      <div className="about_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">Yacht for Sale Catlog</p>
          <div className="text-center pb-5">
            {" "}
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_about">Catlog</span>
          </div>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="row_data">
            {contentData && contentData?.map((item, index) => (
              <div className="col_data" key={index}>
                <div className="box_catalog">
                  <Carousel>
                    {item?.images?.slice(0, 4).map((image, index) => (
                      <Carousel.Item key={index} className="abc">
                        <div className="xyz">
                          <img
                            className="d-block w-100 abcd"
                            src={image}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="box_catalog-content">
                    <h3 className="catlog_title">{item.title}</h3>
                    <div className="capity_row">
                      <span className="catalog_price">
                        Price:
                        <span className="catalog_price_data">
                          {item.price || "N/A"} {item.currency_type}
                        </span>
                      </span>
                    </div>

                    <div className="capity_row row">
                      <span className="catalog_price col-4">
                        Guest:
                        <span className="catalog_price_data">
                          {item.guests || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price col-4">
                        Cabin:
                        <span className="catalog_price_data">
                          {item.cabins || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price col-4">
                        Crew:
                        <span className="catalog_price_data">
                          {item.crew || "N/A"}
                        </span>
                      </span>
                    </div>

                    <div className="capity_row row">
                      <span className="catalog_price col-4">
                        Year:
                        <span className="catalog_price_data">
                          {item.year || "N/A"}
                        </span>
                      </span>

                      <span className="catalog_price col-4">
                        Length:
                        <span className="catalog_price_data">
                          {item.length || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price col-4"></span>
                      {/* <span className="catalog_price">
                        Perk:
                        <span className="catalog_price_data" title={item.perk}>
                          {item.perk && item.perk.length > 7
                            ? item.perk.substring(0, 7) + "..."
                            : item.perk || "N/A"}
                        </span>
                      </span> */}
                    </div>

                    <div className="button-container">
                      <button
                        className="buy_catalog"
                        onClick={() => handleDetailClick(item.id_send)}
                      >
                        VIEW DETAIL
                      </button>
                      {/* <button className="buy_catalog">View Detail</button> */}
                      <button className="learn_catalog" onClick={handleEnquireClick}>ENQUIRE</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Book mySectionRef={mySectionRef} />
      <Reach />
      <Gallery />
      <Footer />
    </>
  );
};

export default Catalog;
