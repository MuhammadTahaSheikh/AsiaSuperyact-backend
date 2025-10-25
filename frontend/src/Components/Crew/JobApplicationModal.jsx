import React, { useState } from "react";
import "./JobApplicationModal.css"; // Include modal styling

function JobApplicationModal({ isOpen, onClose, jobTitle, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || files[0], // Handle file input separately
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      alert("Please fill in all fields and upload a resume.");
      return;
    }
    onSubmitApplication(formData);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // If modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Apply for {jobTitle}</h3>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-field">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-field">
            <label>Upload Resume:</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="apply-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobApplicationModal;
