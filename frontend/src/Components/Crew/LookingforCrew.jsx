import React, { useState } from "react";
import "./LookingforCrew.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import DetailForm from "./DetailForm";
import Footer from "../Footer/Footer";
import YachtForm from "./YachtForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LookingforCrew = () => {
  // Define state for selected checkboxes
  const [positions, setPositions] = useState({
    // captain: false,
    // JuniorDeckhand: false,
    // reliefCaptain: false,
    // chiefOfficer: false,
  });
  const [skills, setSkills] = useState({
    // diveInstructor: true,
    // Florist: false,
    // WaterSportsInstructor: false,
    // PersonalTrainer: false,
    // RaceCrew: false,
    // Doctor: false,
    // PrivateSecurityOfficer: false,
    // Nurse: false,
    // diveInstructor: false,
    // HelicopterPilot: false,
    // Beautician: false,
    // Dronepilot: false,
    // YogaFitnessinstructor: false,
    // Nanny: false,
    // Sommelier: false,
    // Add all other skills options here
  });

  const [formData, setFormData] = useState({
    yachtType: "",
    yachtOperation: "",
    yachtName: "",
    yachtSize: "",
    idealStartDate: "",
    basis: "",
    flag: "",
    preferredTCNOffice: "",
    yourName: "",
    yourEmail: "",
    yourPhone: "",
    yourLocation: "",
    yourMessage: "",
    newsUpdation: false,
    acceptPrivacyPolicy: false,
  });

  const positionsList = [
    { name: "captain", label: "Captain" },
    { name: "juniordeckhand", label: "Junior Deckhand" },
    { name: "cheifeto", label: "Chief ETO" },
    { name: "cookcrewchef", label: "Cook/Crew Chef" },
    { name: "butler", label: "Butler" },

    { name: "chaseBoatCaptain", label: "Chase boat Captain" },
    { name: "decksteward", label: "Deck/Steward(ess)" },
    { name: "avitofficer", label: "AV/IT Officer" },
    { name: "cooksteward", label: "Cook/Steward(ess)" },
    { name: "solosteward", label: "Sole Steward(ess)" },

    { name: "reliefCaptain", label: "Relief Captain" },
    { name: "deckengineer", label: "Deck/Engineer" },
    { name: "engineer", label: "Engineer" },
    { name: "cheifsteward", label: "Chief Steward(ess)" },
    { name: "2ndsteward", label: "2nd Steward(ess)" },

    { name: "chiefOfficer", label: "Chief Officer" },
    { name: "deckdivemaster", label: "Deck/Dive Master" },
    { name: "juniorengineer", label: "Junior Engineer" },
    { name: "purser", label: "Purser" },
    { name: "3rdsteward", label: "3rd Steward(ess)" },

    { name: "mate", label: "Mate" },
    { name: "dayworker", label: "Day Worker" },
    { name: "executiveheadchef", label: "Executive/Head Chef" },
    { name: "interiormanager", label: "Interior Manager" },
    { name: "stewardess", label: "Steward(ess)" },

    { name: "2ndOfficer", label: "2nd Officer" },
    { name: "ChiefEngineer ", label: "Chief Engineer" },
    { name: "SoleChef", label: "Sole Chef" },
    { name: "ChiefStewardEss", label: "Chief Steward(ess)" },
    { name: "StewMasseurEuse", label: "Stew/Masseur(euse)" },

    { name: "3rdOfficer", label: "3rd Officer" },
    { name: "SoleEngineer", label: "Sole Engineer" },
    { name: "Sous2ndChef", label: "Sous/ 2nd Chef" },
    { name: "HeadofService", label: "Head of Service" },
    { name: "LaundrySteward", label: "Laundry Steward(ess)" },

    { name: "Bosun", label: "Bosun" },
    { name: "2ndEngineer", label: "2nd Engineer" },
    { name: "ChefdePartie3rdChef", label: "Chef de Partie/3rd Chef" },
    { name: "HeadofHousekeeping", label: "Head of Housekeeping" },
    { name: "JuniorSteward", label: "Junior Steward(ess)" },

    { name: "Lead Deckhand", label: "Lead Deckhand" },
    { name: "3rd Engineer", label: "3rd Engineer" },
    { name: "Commis/4thChef ", label: "Commis/4th Chef" },
    { name: "SpaManager", label: "Spa Manager" },
    { name: "Other", label: "Other" },
    // Add more positions here
  ];
  const skillsList = [
    { name: "diveInstructor", label: "Dive Instructor" },
    { name: "Florist", label: "Florist" },
    { name: "WaterSportsInstructor", label: "Water sports Instructor" },
    { name: "PersonalTrainer", label: "Personal Trainer" },
    // Add more skill items as needed
    { name: "RaceCrew", label: "Race Crew" },
    { name: "Doctor", label: "Doctor" },
    { name: "PrivateSecurityOfficer", label: "Private Security Officer" },
    { name: "Nurse", label: "Nurse" },
    { name: "HelicopterPilot", label: "Helicopter Pilot" },
    { name: "Beautician", label: "Beautician" },
    { name: "Dronepilot", label: "Drone pilot" },
    { name: "YogaFitnessinstructor", label: "Yoga & Fitness instructor" },
    { name: "Nanny", label: "Nanny" },
    { name: "Sommelier", label: "Sommelier" },
  ];

  const handlePositionChange = (event) => {
    const { name, checked } = event.target;
    setPositions({ ...positions, [name]: checked });
  };

  const handleSkillChange = (event) => {
    const { name, checked } = event.target;
    setSkills({ ...skills, [name]: checked });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;

    if (!form.checkValidity()) {
      alert("Please fill out all required fields.");
      return;
    }

    const isPositionSelected = Object.values(positions).some((value) => value);
    const isSkillSelected = Object.values(skills).some((value) => value);

    if (!isPositionSelected && !isSkillSelected) {
      alert("Please select at least one position or skill.");
      return;
    }

    const allData = {
      positions,
      skills,
      ...formData,
    };
    console.log("Submitting Data:", allData);

    try {
      const response = await axios.post(
        "/api/add-crew",
        allData
      );
      toast.success("successfully")
      console.log("Response Data:", response.data);
      setPositions({});
      setSkills({});
      setFormData({
        yachtType: "",
        yachtOperation: "",
        yachtName: "",
        yachtSize: "",
        idealStartDate: "",
        basis: "",
        flag: "",
        preferredTCNOffice: "",
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        yourLocation: "",
        yourMessage: "",
        newsUpdation: false,
        acceptPrivacyPolicy: false,
      });
    } catch (error) {
      console.error("Error occurred:", error.response || error.yourMessage);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact_back_crew">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">Looking for Crew</p>
          <div className="text-center pb-5">
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_contact">Crew</span>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <p className="looking_crew_main_heading">
          Recruiting Crew For My Yacht
        </p>
        <p className="looking_crew_main_content">
          We want to help you find the right person to fill your yacht position
          and we understand that one size <br /> does not fit all. With our
          in-depth interviews and profiling, we spend the time so you don’t have
          to, and <br /> you can be sure that the selection of candidates that
          we present are pre-filtered.
        </p>
      </div>
      <div className="container">
        <h2 className="positionh2">Positions I Need For My Yacht...</h2>
        <div className="positions label-container container">
          {positionsList.map((position, index) => (
            <label key={index} className="label_looking_crew">
              <input
                type="checkbox"
                name={position.name}
                checked={positions[position.name]}
                onChange={handlePositionChange}
                className="checkbox_css"
                required
              />
              {position.label}
            </label>
          ))}
        </div>
        <h2 className="positionh2">Added Skills</h2>
        <div className="skills container">
          {skillsList.map((skill) => (
            <label className="label_skill_crew" key={skill.name}>
              <input
                type="checkbox"
                name={skill.name}
                checked={skills[skill.name]}
                onChange={handleSkillChange}
                className="checkbox_css"
                required
              />
              {skill.label}
            </label>
          ))}
        </div>
      </div>
     
      <form className="container" onSubmit={handleSubmit}>
      <h2 className="positionh2">Yacht Information</h2>
      <div className="yacht-form mb-5">
      <div className="form-group">
    
            <label>Yacht Type</label>
            <input
              type="text"
              name="yachtType"
              value={formData.yachtType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Yacht Operation</label>
            <input
              type="text"
              name="yachtOperation"
              value={formData.yachtOperation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Yacht Name</label>
            <input
              type="text"
              name="yachtName"
              value={formData.yachtName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Yacht Size</label>
            <input
              type="text"
              name="yachtSize"
              value={formData.yachtSize}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ideal Start Date</label>
            <input
              type="date"
              name="idealStartDate"
              value={formData.idealStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Basis</label>
            <input
              type="text"
              name="basis"
              value={formData.basis}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Flag</label>
            <select name="flag" value={formData.flag} onChange={handleChange}>
              <option>Please choose an option</option>
            </select>
          </div>
          <div className="form-group">
            <label>Preferred TCN Office</label>
            <input
              type="text"
              name="preferredTCNOffice"
              value={formData.preferredTCNOffice}
              onChange={handleChange}
              required
            />
          </div>
          </div>
        <h2 className="positionh2">Your Details</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div
            style={{ flex: "1", marginRight: "10px" }}
            className="form-group"
          >
            <label>Your Name (required)</label>
            <input
              type="text"
              name="yourName"
              value={formData.yourName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ flex: "1" }} className="form-group">
            <label>Your Email (required)</label>
            <input
              type="email"
              name="yourEmail"
              value={formData.yourEmail}
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
        >
          <div
            style={{ flex: "1", marginRight: "10px" }}
            className="form-group"
          >
            <label>Phone</label>
            <input
              type="tel"
              name="yourPhone"
              value={formData.yourPhone}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ flex: "1" }} className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="yourLocation"
              value={formData.yourLocation}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="yourMessage"
            value={formData.yourMessage}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            className="form-group"
          />
        </div>
        <div className="form-group checkbox_privacy mt-3">
          <label>
            <input
              type="checkbox"
              name="newsUpdation"
              checked={formData.newsUpdation}
              onChange={handleChange}
              className="checkbox_css"
              required
            />
            Please keep me up to date with the latest TCN news
          </label>
        </div>
        <div className="form-group checkbox_privacy">
          <label>
            <input
              type="checkbox"
              name="acceptPrivacyPolicy"
              checked={formData.acceptPrivacyPolicy}
              onChange={handleChange}
              className="checkbox_css"
              required
            />
            I confirm I have read, understood and I accept all the conditions of
            the Privacy Policy regarding treatment of data.
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="submit_looking_crew">
            Submit
          </button>
        </div>
      </form>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default LookingforCrew;
