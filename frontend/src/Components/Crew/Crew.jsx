import axios from "axios";
import { Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./Crew.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import JobApplicationModal from "./JobApplicationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Crew() {
  const [filters, setFilters] = useState({
    designation: "",
    yachtSize: "",
    yachtType: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [noResults, setNoResults] = useState(false); // New state for no results
  const titles = ["", "Qualification:", "Experience:" ,"Yacht Size:"];
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/jobs");
        setJobs(response.data.data);
        // toast.success("Jobs loaded successfully!");

        setLoading(false);
      } catch (error) {
        // setError("Failed to fetch jobs");
        // toast.error("Failed to fetch jobs");

        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // const filteredJobs = jobs.filter((job) => {
  //   return (
  //     (!filters.designation || job.designation.includes(filters.designation)) &&
  //     (!filters.yachtSize || job.yachtSize.includes(filters.yachtSize)) &&
  //     (!filters.yachtType || job.yachtType.includes(filters.yachtType)) &&
  //     (!filters.gender || job.gender.includes(filters.gender))
  //   );
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset error state before making a request
    setNoResults(false);
    try {
      const { designation, yachtSize, yachtType, gender } = filters;
      const response = await axios.get(
        "/api/jobs-search",
        {
          params: {
            designation,
            yacht_size: yachtSize,
            yacht_type: yachtType,
            gender,
          },
        }
      );
      setJobs(response.data.data);
      if (response.data.data.length === 0) {
        setNoResults(true);
        toast.error("No jobs found for the given filters");
      } else {
        toast.success("Jobs fetched successfully!");
      }
    } catch (error) {
      // setError("Failed to fetch jobs");
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="crew_back">
        <div className="list_building">
          <p className="catalog_nav_head pt-5 ">Looking for Job</p>
          <div className="text-center pb-5">
            <Link to="/" className="link_css">
              <span className="subHead_home">Home</span>
            </Link>
            <span className="arrow_sub pr-3">&#62;</span>
            <span className="subHead_about">Available Jobs</span>
          </div>
        </div>
      </div>
      <div className="">
        <div className="main_job_search job-search">
          <h2 className="job_search_css">Job Search</h2>
          <div className="filter">
            {/* Designation Dropdown */}
            <select
              className="input_crew"
              name="designation"
              value={filters.designation}
              onChange={handleChange}
            >
              <option value=""> Designation</option>
              <option value="caption">Captain</option>
              <option value="Mate">Mate</option>
              <option value="cheif_officer">Cheif Officer</option>
              <option value="2nd_officer">2nd Officer</option>
              <option value="3rd_officer">3rd Officer</option>
              <option value="bosun">Bosun</option>
              <option value="lead_duckhand">Lead deckhand</option>
              <option value="chase_boat_captain">Chase Boad Captain</option>
              <option value="junior_deckhand">Junior Deskhand</option>
              <option value="carpenter">Carpenter</option>
              <option value="deck_engineer">Deck Engineer</option>
              <option value="deck_diver">Deck Diver</option>

              <option value="Purser">Purser</option>
              <option value="Cheif_steward">Cheif Steward</option>
              <option value="head_office">Head of Office</option>
              <option value="head_interior">Head of Interior</option>
              <option value="steward">Steward</option>
              <option value="Mate">Mate</option>
              <option value="cheif_officer">Cheif Officer</option>
              <option value="2nd_officer">2nd Officer</option>
              <option value="2nd_Steward">2nd Steward</option>
              <option value="3rd_Steward">3rd Steward</option>
              <option value="HK_Steward">HK Steward</option>
              <option value="Service_Steward">Service Steward</option>
              <option value="Junior_Steward">Junior Steward</option>
              <option value="Junior_Service">Junior Service</option>
              <option value="Junior_Housekeeper">Junior Housekeeper</option>
              <option value="Sole_Steward">Sole Steward</option>
              <option value="Laundry">Laundry</option>
              <option value="Masseuse">Masseuse</option>
              <option value="Personal_Trainer">Personal Trainer</option>
              <option value="Spa_Manager">Spa Manager</option>
              <option value="Spa_Therapist">Spa Therapist</option>
              <option value="Beauty_Therapist">Beauty Therapist</option>
              <option value="Hair_Dresser">Hair Dresser</option>
              <option value="Nanny">Nanny</option>
              <option value="Nurse">Nurse</option>
              <option value="Head_Chef">Head Chef</option>
              <option value="Sole_Chef">Sole Chef</option>
              <option value="Sous_Chef">Sous Chef</option>
              <option value="3rd_Chef">3rd Chef</option>
              <option value="Cook">Cook</option>
              <option value="Galley_Hand">Galley Hand</option>
              <option value="Chief_Engineer">Chief Engineer</option>
              <option value="2nd_Engineer">2nd Engineer</option>
              <option value="3rd_Engineer">3rd Engineer</option>
              <option value="4th_Engineer">4th Engineer</option>
              <option value="Electrical_Engineer">Electrical Engineer</option>
              <option value="Electronic_Engineer">Electronic Engineer</option>
              <option value="ETO">ETO</option>
              <option value="Sole_Engineer">Sole Engineer</option>
              <option value="Rotation_Only">Rotation Only</option>
              <option value="AV/IT">AV/IT</option>
            </select>

            {/* Yacht Size Dropdown */}
            <select
              className="input_crew"
              name="yachtSize"
              value={filters.yachtSize}
              onChange={handleChange}
            >
              <option value=""> Yacht Size</option>
              <option value="0-24m">0-24</option>
              <option value="25-34m">25-34</option>
              <option value="35-44m">35-44</option>
              <option value="44-54m">44-54</option>
              <option value="55-64m">55-64</option>
              <option value="65-84m">65-84</option>
              <option value="85-114m">85-114</option>
              <option value="115-144m">115-144</option>
              <option value="145m">145</option>
              {/* Add more options as needed */}
            </select>

            {/* Yacht Type Dropdown */}
            <select
              className="input_crew"
              name="yachtType"
              value={filters.yachtType}
              onChange={handleChange}
            >
              <option value=""> Yacht Type</option>
              <option value="motor">Motor</option>
              <option value="sailing">Sailing</option>
              <option value="shorebased">Shore Based</option>
              {/* Add more options as needed */}
            </select>

            {/* Gender Dropdown */}
            <select
              className="input_crew"
              name="gender"
              value={filters.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Search Button */}
            <button
              className="search_crew"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {/* {loading && <p>Loading jobs...</p>}
        {error && <p>Error: {error}</p>} */}
        <div className="container">
          <div className="job-board">
            <div className="main-container">
              <h1>
                <span>{jobs && jobs.length}</span> JOBS FOUND
              </h1>

              <div>
                {jobs.map((Job, index) => (
                  <div className="job" key={index}>
                    <div>
                      <h3>{Job.title}</h3>
                      <p>{Job.location}</p>
                      <ul>
                        {Job.info &&
                          Job.info.map((item, i) => 
                          <li key={i}>{titles[i]}{item}</li>)}
                      </ul>
                    </div>
                    <div className="button-parent">
                      <Link to={`/job-details/${Job.id}`}>
                        <button>Apply</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Crew;
