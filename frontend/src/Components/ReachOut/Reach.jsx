import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Reach.css";
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
function Reach() {
  const [yachtsData, setYachtsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const detailRef = useRef(null);
  useEffect(() => {
    axios
      .get("/api/reach-out")
      .then((response) => {
        setYachtsData(response.data.data[0]);
        setLoading(false); // Set loading to false after data fetch
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false); // Also set to false in case of error
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

  return (
    <>
      <div className="reach-container" ref={detailRef}>
        <div className="reach_background">
          <div className="container">
            <div className="all_content">
              <div>
                <p className="reach">Reach Out</p>
              </div>
              <div
                className={`text-center pb-3  ${visible ? "slide-in-up" : ""}`}
              >
                <FaMapMarkerAlt className="icon_reach" />
                <span className="location_reach">
                  {yachtsData?.address || ""}
                </span>
              </div>
              <div
                className={`text-center pb-3  ${visible ? "slide-in-up" : ""}`}
              >
                <FaEnvelope className="icon_reach" />
                <span className="mail_reach"> {yachtsData?.email}</span>
              </div>
              <div className={`text-center ${visible ? "slide-in-up" : ""}`}>
                <FaPhoneAlt className="icon_reach" />
                <span className="call_reach"> {yachtsData?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reach;
