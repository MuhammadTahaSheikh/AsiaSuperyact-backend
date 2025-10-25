import React, { useState, useEffect } from "react";
import "./Contact.css";
import axios from "axios";
import { Link } from "react-router-dom";
import envelop from "../../Assets/Footer/envelope.png";
import phone from "../../Assets/Footer/phone.png";
import location from "../../Assets/Footer/location.png";
import Map from "./Map";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
    subject: "A",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/contact-us", formData);
      toast.success("Message sent successfully!");

      setFormData({ name: "", email: "", phone: "", enquiry: "", subject: "" });
    } catch (error) {
      toast.error(error.response.data.error);
console.log("what",error.response.data.error)
      // toast.error("Failed to send message. Please try again.");
      // console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
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
  return (
    <div>
      <Navbar />
      <div className="contact_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">Contact Us</p>
          <div className="text-center pb-5">
            {" "}
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_contact">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-12 p-0 m-0">
            <div className="blue_side_form_main_div">
              <p className="contact_contact">Contact Us</p>

              <div className="row mt-5">
                <div className="col-lg-2 col-md-2 col-2">
                  <img
                    src={phone}
                    className="email_style_icon_form"
                    alt="formlogo"
                  />
                </div>
                <div className="col-lg-9 col-md-9 col-9 p-0">
                  <p className="location_heading_form">Phone</p>
                  <p className="para_in_location_form">
                    Thailand{" "}
                    <a href="tel:+66649913606" className="phone_css_nav">
                      +66 649913606
                    </a>
                  </p>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-2 col-md-2 col-2">
                  <img
                    src={envelop}
                    className="email_style_icon_form"
                    alt="formlogo"
                  />
                </div>
                <div className="col-lg-9 col-md-9 col-9">
                  <p className="location_heading_form"> Email </p>
                  <p className="para_in_location_form ">
                    <a
                      href="mailto:info@asiasuperyachts.com"
                      className="phone_css_nav"
                    >
                      info@asiasuperyachts.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-2 col-md-2 col-2">
                  <img
                    src={location}
                    className="email_style_icon_form"
                    alt="formlogo"
                  />
                </div>
                <div className="col-lg-9 col-md-9 col-9 p-0">
                  <p className="location_heading_form"> Address</p>
                  <p className="para_in_location_form ">
                    7 Bell Yard, London United Kingdom
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12 p-0 m-0">
            <form onSubmit={handleSubmit}>
              <div className="white_side_form_main_div">
                <p className="para_in_form">Let’s Talk</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing, elit libero
                  facilisis donec laoreetridiculus{" "}
                </p>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      className="input_style_name_form"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      className="input_style_name_form"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      className="input_style_name_form"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                    />
                  </div>
                </div>

                <textarea
                  className="textarea_form_get_in_touch"
                  placeholder="Text Message"
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  required
                />
                <input type="hidden" name="subject" value={formData.subject} />
                <div className="text-danger" id="recaptchaError"></div>
                <div className="btn_submit">
                  <button
                    className="button_style_form_get_in_touch"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "SEND MESSAGE"}
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Map />
      <Footer />
    </div>
  );
}

export default Contact;
