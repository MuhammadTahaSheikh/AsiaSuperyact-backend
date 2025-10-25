import React, { useState } from "react";

function DetailForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    subscribe: false,
    acceptPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2  className="positionh2">Your Details</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ flex: "1", marginRight: "10px" }} className="form-group">
          <label>Your Name (required)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ flex: "1" }} className="form-group">
          <label>Your Email (required)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
        className="form-group"
      >
        <div style={{ flex: "1", marginRight: "10px" }}>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ flex: "1" }}>
          <label>Location (Currently berthed)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Anything else you want us to know?</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          className="form-group"
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        <label> Please keep me up to date with the latest TCN news</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="acceptPolicy"
          checked={formData.acceptPolicy}
          onChange={handleChange}
          required
        />
        <label>
          I confirm I have read, understood and I accept all the conditions of
          the Privacy Policy regarding treatment of data.
        </label>
      </div>
      <div className="submit_detail_crew_sale text-center">
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default DetailForm;
