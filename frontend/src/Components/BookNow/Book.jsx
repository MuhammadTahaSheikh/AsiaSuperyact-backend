import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Book.css";
import { Form, Button } from "react-bootstrap";
import support from "../../Assets/Book/Background.png";
function Book({ mySectionRef }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    enquiry: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const bookRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/contact-us", formData);
      if (response) {
        setSuccessMessage("Your enquiry has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", enquiry: "" });
      }
    } catch (error) {
      console.error("There was an error sending your enquiry:", error);
      setSuccessMessage("Failed to send enquiry. Please try again.");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 }
    );

    if (bookRef.current) {
      observer.observe(bookRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="container mb-4 mt-4" ref={mySectionRef} id="enquire-now">
      <p className="book_heading">Contact Us to Discuss your Requirements</p>
      <div className="row m-0">
        <div
          className={`col-xl-4 col-lg-4 col-md-6 col-sm-4 ${
            isVisible ? "slide-in-left" : ""
          }`}
        >
          <img src={support} alt="customer support" className="w-100" />
        </div>
        <div
          className={`col-xl-4 col-lg-4 col-md-6 col-sm-4 ${
            isVisible ? "slide-in-left" : ""
          }`}
        >
          <p className="welcome_book">Welcome to our site</p>
          <h3 className="book_now">Make an enquiry</h3>
          <p className="content_book">
            A yacht is the ultimate personal preference. It is about what you
            want: where to go, which yacht to choose, what to do – there are so
            many possibilities. Whatever you have in mind, we will make it
            happen. 
          </p>
          <ul className="book_ul">
            <li className="book_li">Open Bar</li>
            <li className="book_li">Specialty Dining</li>
            <li className="book_li">Excursions</li>
            <li className="book_li">WiFi</li>
            <li className="book_li">Extra Guest</li>
          </ul>
        </div>
        <div
          className={`col-xl-4 col-lg-4 col-md-6 col-sm-4 ${
            isVisible ? "slide-in-right" : ""
          }`}
        >
          <div className="form_back">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="form_values">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="form_values">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSubject" className="form_values">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=""
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEnquiry" className="form_values">
                <Form.Label>Enquiry</Form.Label>
                <Form.Control
                  as="textarea"
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  placeholder=""
                  rows={4}
                  required
                />
              </Form.Group>
              <div className="btn_div">
                <Button type="submit" className="mt-3 btn_book">
                  ENQUIRY NOW
                </Button>
              </div>
            </Form>
            {successMessage && (
              <div className="success-message mt-3">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
