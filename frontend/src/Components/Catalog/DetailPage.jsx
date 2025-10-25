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
function DetailPage() {
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
            <p className="asking_detail">
              Asking {product?.price} {product?.currency_type}
              {/* {product?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })} */}
            </p>

            <div className="">
              <div className="product-detail-card">
                <h2 className="card-title">Key specifications</h2>
                <div className="specification">
                  <span className="spec-label">Length</span>
                  <span className="spec-value">{product?.length || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Year</span>
                  <span className="spec-value">{product?.year || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Guests</span>
                  <span className="spec-value">{product?.guests || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Cabins</span>
                  <span className="spec-value">{product?.cabins || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Crew</span>
                  <span className="spec-value">{product?.crew || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Builder</span>
                  <span className="spec-value">{product?.builder || "N/A"}</span>
                </div>
                <div className="specification">
                  <span className="spec-label">Gross Tons</span>
                  <span className="spec-value">{product?.grossTonnage || "N/A"}</span>
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
                    <div class="accordion-body">
                      {/* <h2>Exterior Design & Engineering</h2> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: product?.exteriorDesignDescription,
                        }}
                      />
                      {/* <h2>Amenities</h2>
                      <p>{product?.amenitiesDescription}</p>

                      <h2>Interior Design</h2>
                      <p>{product?.interiorDesignDescription}</p>

                      <h2>Toys & Tenders</h2>
                      <p>{product?.toysAndTendersDescription}</p> */}
                    </div>
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
                            <span>Length</span>
                            <span> {product?.length || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Beam</span>
                            <span>{product?.beam || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Draft</span>
                            <span>{product?.draft || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Crusing Speed</span>
                            <span>{product?.cruisingSpeed || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Builder</span>
                            <span>{product?.builder || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Naval Architect</span>
                            <span>{product?.navalArchitect || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Exterior Designer</span>
                            <span>{product?.exteriorDesigner || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Interior Designer</span>
                            <span>{product?.interiorDesigner || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Hull Material</span>
                            <span>{product?.hullMaterial || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Superstructure Material</span>
                            <span>{product?.superstructureMaterial || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Gross Tonnage</span>
                            <span>{product?.grossTonnage || "N/A"}</span>
                          </div>
                          <div className="spec-row">
                            <span>Deck Material</span>
                            <span>{product?.deckMaterial || "N/A"}</span>
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

export default DetailPage;
