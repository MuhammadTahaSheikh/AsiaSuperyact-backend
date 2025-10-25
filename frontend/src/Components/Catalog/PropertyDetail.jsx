import React, { useState, useEffect, useRef } from "react";
import "./DetailPage.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Book from "../BookNow/Book";
import Reach from "../ReachOut/Reach";
import Gallery from "../Gallery/Gallery";
import Footer from "../Footer/Footer";
import VideoSlider from "./VideoSlider";
import detail_img from "../../Assets/DetailPage/detail_img.png";
import { Link } from "react-router-dom";
import ProductDetail from "./show-more/product-detail";
function PropertyDetail() {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const scrollToBook = () => {
    if (bookRef.current) {
      bookRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
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
  // const { product } = location?.state;
  const product = location.state?.product;
  const images = product?.imageURL ? product.imageURL.split(",") : [];

  // const images = product.imageURL.split(",");
  return (
    <div>
      <Navbar />
      <div className="contact_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">{product?.title}</p>
          <div className="text-center pb-5">
            {" "}
            <span className="link_css" onClick={() => navigate(-1)}>
              <span className="subHead_home">Home</span>
            </span>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_contact">Details</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-">
            <h1 className="asking_detail_head">{product?.title}</h1>
            {/* <p className="asking_detail">
              Asking{" "}
              {product?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p> */}

            <div className="">
              <div className="product-detail-card">
                <h2 className="card-title">Key specifications</h2>
                <div className="specification">
                  <span className="spec-label">Year Built</span>
                  <span className="spec-value">{product?.year_built || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Living Area SqFt</span>
                  <span className="spec-value">
                    {product?.living_area_sqft || "N/A"}
                  </span>
                </div>
                <div className="specification">
                  <span className="spec-label">Bedrooms</span>
                  <span className="spec-value">{product?.bedrooms || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Bathrooms</span>
                  <span className="spec-value">{product?.bathrooms || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">No. of Units</span>
                  <span className="spec-value">{product?.no_of_units || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Last Sale Date</span>
                  <span className="spec-value">{product?.last_sale_date || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Property Vacant</span>
                  <span className="spec-value">{product?.property_vacant || "N/A"}</span>
                </div>
                <button className="enquire-button" onClick={scrollToBook}>
                  ENQUIRE NOW
                </button>
              </div>
              <div>
                <p></p>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-">
            <p className="mt-5">{product?.displayedDescription}</p>

            <div>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item accordian_border">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button accordian_bg collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Full Description
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    {/* <div class="accordion-body">
                      <h2>Exterior Design & Engineering</h2>
                      <p dangerouslySetInnerHTML={{ __html: product?.exteriorDesignDescription }} />
                      <h2>Amenities</h2>
                      <p>{product?.amenitiesDescription}</p>

                      <h2>Interior Design</h2>
                      <p>{product?.interiorDesignDescription}</p>

                      <h2>Toys & Tenders</h2>
                      <p>{product?.toysAndTendersDescription}</p>
                    </div> */}
                  </div>
                </div>
                <div class="accordion-item accordian_border">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button accordian_bg collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Specifications
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div className="yacht-details-container">
                        <h2>Specifications</h2>
                        <div className="specifications">
                          <div className="spec-row">
                            <span>Year built</span>
                            <span> {product?.year_built || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Living Area Sqft</span>
                            <span>{product?.living_area_sqft || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Apn</span>
                            <span>{product?.apn || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Owner type</span>
                            <span>{product?.owner_type || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Ownership length</span>
                            <span>{product?.ownership_length || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Estimated Rent</span>
                            <span>{product?.estimated_rent || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Address</span>
                            <span>{product?.address || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Confidence Score</span>
                            <span>{product?.confidence_score || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Estimated Equity</span>
                            <span>{product?.estimated_equity || "N/A"}</span>
                          </div>

                          <div className="spec-row">
                            <span>Skiped traced</span>
                            <span>{product?.skiped_traced || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Ownership length</span>
                            <span>{product?.ownership_length || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="image-gallery">
                  <div className="full-image">
                    <img
                      src={images[0]}

                      alt="Main"
                    />
                  </div>
                  <div className="thumbnail-images">
                    {images?.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        src={image.trim()}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => {
                          console.log(`Thumbnail ${index + 1} clicked`);
                        }}
                      />
                    ))}
                  </div>
                </div>
                {images && images.length > 0 && (
                  <ProductDetail images={images} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <VideoSlider /> */}
      <div ref={bookRef}>
        <Book />
      </div>
      <Reach />
      <Gallery />
      <Footer />
    </div>
  );
}

export default PropertyDetail;
