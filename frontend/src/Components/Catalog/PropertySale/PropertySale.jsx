import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import "./PropertySale.css"; // Import your CSS file
import ship1 from "../../../Assets/Catalog/data1.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Book from "../../BookNow/Book";
import Reach from "../../ReachOut/Reach";
import Gallery from "../../Gallery/Gallery";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
const PropertySale = ({ mySectionRef, handleEnquireClick }) => {
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
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/property");

      const products = response.data.map((product) => ({
        title: product.title,
        price: product.price,
        currency_type:product.currency_type,
        year_built:product.year_built,
        living_area_sqft:product.living_area_sqft,
        estimated_rent:product.estimated_rent,
        bathrooms:product.bathrooms,
        capacity: product.capacity,
        pictureSpots: product.pictureSpots,
        bedrooms: product.bedrooms,
        updated_on: product.updated_at,
        ratio_space: product.ratioOfSpace,
        perk: product.perk,
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
  const handleDetailClick = (id) => {
    axios
      .get(`/api/property/${id}`) // Fetch the specific product details
      .then((response) => {
        console.log("response", response.data);
        // Navigate to the detail page and pass the product data
        navigate("/detail-property-page", { state: { product: response.data } });
        

      })
      .catch((error) => {
        console.error("Error fetching the product details:", error);
      });
  };
  // const filteredProducts = contentData.filter(
  //   (product) => product.categoryID == 3
  // );

  return (
    <>
      <Navbar handleEnquireClick={handleEnquireClick} />
      <div className="about_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">Property For Sale Catalog</p>
          <div className="text-center pb-5">
            {" "}
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_about">Property Sale</span>
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
            {contentData?.map((item, index) => (
              <div className="col_data" key={index}>
                <div className="box_catalog">
                  <Carousel>
                    {item?.images?.slice(0, 4).map((image, index) => (
                      <Carousel.Item key={index} className="abc">
                        <div className="xyz">
                          <img
                            className="d-block w-100 abcd"
                            src={`${
                              process.env.REACT_APP_BASE_URL
                            }${image?.replace(
                              /^https?:\/\/backend\.asiasuperyachts\.com/,
                              ""
                            )}`}
                            // src={`${process.env.REACT_APP_BASE_URL}/${image}`}
                            alt={`Slide ${index + 1}`}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <div className="box_catalog-content">
                    <h3 className="catlog_title">{item.title}</h3>
                    <div className="capity_row">
                      <span className="catalog_price catalog_price_head">
                        Price:
                        <span className="catalog_price_data">
                          {item.price || "N/A"} {item.currency_type}
                        </span>
                      </span>
                    </div>
                    <div className="capity_row">
                      <span className="catalog_price catalog_price_head">
                        Bed:
                        <span className="catalog_price_data">
                          {item.bedrooms || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price catalog_price_head">
                        Bath:
                        <span className="catalog_price_data">
                          {item.bathrooms || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price catalog_price_head">
                        Year Built:
                        <span className="catalog_price_data">
                          {item.year_built || "N/A"}
                        </span>
                      </span>
                    </div>
                    <div className="capity_row">
                      <span className="catalog_price catalog_price_head">
                        Updated on:
                        <span className="catalog_price_data">
                          {item.updated_on
                            ? new Date(item.updated_on).getFullYear()
                            : "N/A"}
                        </span>
                      </span>

                      <span className="catalog_price catalog_price_head">
                        Area Sq.Ft:
                        <span className="catalog_price_data">
                          {item?.living_area_sqft || "N/A"}
                        </span>
                      </span>
                      <span className="catalog_price catalog_price_head">
                        Estimated Rent:
                        <span className="catalog_price_data" title={item.perk}>
                          {item?.estimated_rent}
                        </span>
                      </span>
                    </div>
                    <div className="button-container">
                      <button
                        className="buy_catalog"
                        onClick={() => handleDetailClick(item.id_send)}
                      >
                        Details
                      </button>
                      {/* <button className="buy_catalog">View Detail</button> */}
                      <button
                        className="learn_catalog"
                        onClick={handleEnquireClick}
                      >
                        Enquire
                      </button>
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

export default PropertySale;
