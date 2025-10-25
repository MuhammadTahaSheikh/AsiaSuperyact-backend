import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons for Edit and Delete
import Footer from "../../Components/Footer/Footer";
import "./job.css";
import JobTable from "./jobTable";

const AddJobForm = () => {
  const [data, setData] = useState([]); // State to hold job data
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    gender: "",
    designation: "",
    yachtSize: "",
    yachtType: "",
    duration: "",
    offeredSalary: "",
    experience: "",
    expirationDate: "",
    qualification: "",
    location: "",
    description: "",
    requirements: "",
  });
  const [buttonText, setButtonText] = useState("Save"); // Track button text
  const [isLoading, setIsLoading] = useState(false);
  const [cancelButton, setCancelButton]=useState(false);
  const handleEdit = async (id) => {
    
    setCancelButton(true);
    try {
      // Get the job data for editing based on the job's id
      const selectedJob = data.find((job) => job.id === id); // Use `find` to get the job by id
   
      if (selectedJob) {
        const formattedExpirationDate =
          new Date(selectedJob.expirationDate).toISOString().split("T")[0] ||
          ""; // Example: '2024-11-18'

        // Set form data with the selected job's values, including the id
        setFormData({
          id: selectedJob.id, // Add the job id here
          title: selectedJob.jobTitle || "",
          companyName: selectedJob.companyName || "",
          gender: selectedJob.gender || "",
          designation: selectedJob.designation || "",
          yachtSize: selectedJob.yachtSize || "",
          yachtType: selectedJob.yachtType || "",
          duration: selectedJob.duration || "",
          offeredSalary: selectedJob.offeredSalary || "",
          experience: selectedJob.experience || "",
          expirationDate: formattedExpirationDate || "",
          qualification: selectedJob.qualification || "",
          location: selectedJob.location || "",
          description: selectedJob.description || "",
          requirements: selectedJob.requirements || "",
        });
        setButtonText("Update");
      }
    } catch (error) {
      console.error("Error editing job:", error);
    }
 
  };

  const handleDelete = async (id) => {
    // Show a confirmation dialog before proceeding with deletion
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(`/api/delete-job/${id}`);
        console.log("Job deleted successfully:", response.data);
        // Optionally update the state to remove the deleted item
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // setFormData({ ...formData, [name]: value });
  };

  // Handle changes for description and requirement fields
  const handleDescriptionChange = (value) => {
    // setFormData({ ...formData, description: value });
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleRequirementChange = (value) => {
    // setFormData({ ...formData, requirements: value });
    setFormData((prevData) => ({
      ...prevData,
      requirements: value,
    }));
  };
  const handleCancel = () => {
    setCancelButton(false);
    setButtonText("Save");
    setFormData({
      title: "",
      companyName: "",
      gender: "",
      designation: "",
      yachtSize: "",
      yachtType: "",
      duration: "",
      offeredSalary: "",
      experience: "",
      expirationDate: "",
      qualification: "",
      location: "",
      description: "",
      requirements: "",
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      companyName: formData.companyName,
      gender: formData.gender,
      designation: formData.designation,
      yachtSize: formData.yachtSize,
      yachtType: formData.yachtType,
      duration: formData.duration,
      offeredSalary: formData.offeredSalary,
      experience: formData.experience,
      expirationDate: formData.expirationDate,
      qualification: formData.qualification,
      location: formData.location,
      description: formData.description,
      requirements: formData.requirements,
    };
    try {
      let response;
      if (formData.id) {
        // Edit job
        response = await axios.post(`/api/edit-job/${formData.id}`, payload);
      } else {
        // Add new job

        response = await axios.post("/api/add-job", payload);
      }

      // Reset the form

      handleDescriptionChange(""); // Reset description Quill content
      handleRequirementChange("");
      setButtonText("Save");
      // Fetch the updated job data
      const updatedJobs = await axios.get("/api/jobs");
      if (updatedJobs.data && updatedJobs.data.data) {
        const jobData = updatedJobs.data.data.map((job) => ({
          id: job.id,
          jobTitle: job.title,
          companyName: job.companyName,
          gender: job.gender,
          offeredSalary: job.offeredSalary,
          expirationDate: job.expirationDate,
          qualification: job.info[1],
          designation: job.designation || "N/A",
          yachtType: job.yachtType || "N/A",
          yachtSize: job.info[3] || "N/A",
          duration: job.info[0] || "N/A",
          experience: job.info[2] || "N/A",
          location: job.location || "N/A",
          description: job.description || "",
          requirements: job.requirements || "",
          created_at: job.created_at || "",
        }));
        setData(jobData); // Update the state with the latest job data
      }
      setFormData({
        title: "",
        companyName: "",
        gender: "",
        designation: "",
        yachtSize: "",
        yachtType: "",
        duration: "",
        offeredSalary: "",
        experience: "",
        expirationDate: "",
        qualification: "",
        location: "",
        description: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request finishes
      setCancelButton(false);
    }
  };
  console.log("dtaa reset plzz", formData);
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobs");

        if (response.data && response.data.data) {
          // Set the job data in state
          const jobData = response.data.data.map((job) => ({
            id: job.id,
            jobTitle: job.title,
            companyName: job.companyName,
            gender: job.gender,
            offeredSalary: job.offeredSalary,
            expirationDate: job.expirationDate,
            qualification: job.info[1],
            designation: job.designation || "N/A",
            yachtType: job.yachtType || "N/A",
            yachtSize: job.info[3] || "N/A",
            duration: job.info[0] || "N/A",
            experience: job.info[2] || "N/A",
            location: job.location || "N/A",
            description: job.description || "",
            requirements: job.requirements || "",
            created_at: job.created_at || "",
          }));
          setData(jobData);
        }
      } catch (error) {
        console.error("Error fetching jobs data:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div>
      <form className="container add-job-form" onSubmit={handleSubmit}>
        <h2>Add Job</h2>
        <div className="form-container_jobform">
          <div className="form-group_jobform">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field_jobform"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group_jobform">
            <label>Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="input-field_jobform"
            >
              <option value="">Select</option>
              <option value="Captain">Captain</option>
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
              {/* Add other options as needed */}
            </select>
          </div>
          <div className="form-group_jobform">
            <label>Yacht Size</label>
            <select
              name="yachtSize"
              value={formData.yachtSize}
              onChange={handleChange}
              className="input-field_jobform"
            >
              <option value="">Select</option>
              <option value="0-24m">0-24</option>
              <option value="25-34m">25-34</option>
              <option value="35-44m">35-44</option>
              <option value="44-54m">44-54</option>
              <option value="55-64m">55-64</option>
              <option value="65-84m">65-84</option>
              <option value="85-114m">85-114</option>
              <option value="115-144m">115-144</option>
              <option value="145m">145</option>
            </select>
          </div>
          <div className="form-group_jobform">
            <label>Yacht Type</label>
            <select
              name="yachtType"
              value={formData.yachtType}
              onChange={handleChange}
              className="input-field_jobform"
            >
              <option value="">Select</option>
              <option value="motor">Motor</option>
              <option value="sailing">Sailing</option>
              <option value="shorebased">Shore Based</option>
              {/* Add other options as needed */}
            </select>
          </div>
          <div className="form-group_jobform">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Offered Salary</label>
            <input
              type="text"
              name="offeredSalary"
              value={formData.offeredSalary}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Expiration Date</label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field_jobform"
            />
          </div>
          <div className="form-group_jobform full-width_jobform">
            <label>Description:</label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
            />
            {/* <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field_jobform"
            /> */}
          </div>
          <div className="form-group_jobform full-width_jobform mt-3">
            <label>Requirement:</label>
            <ReactQuill
              value={formData.requirements}
              onChange={handleRequirementChange}
            />
            {/* <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="input-field_jobform"
            /> */}
          </div>
         

          <button
            type="submit"
            className="submit-button_addjob mt-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span> // You can replace this with a spinner icon
            ) : (
              buttonText
            )}
            
          </button>
          {cancelButton && (
  <button type="button" className="submit-button_addjob mt-3" onClick={handleCancel}>
    Cancel
  </button>
)}
          {/* <button type="submit" className="submit-button_addjob mt-3">
            {buttonText}
          </button> */}
        </div>
      </form>
      <div className="job_table_main">
        <table className="job_table">
          <thead>
            <tr>
              <th className="th_job">Job Title</th>
              <th className="th_job">Designation</th>
              <th className="th_job">Yacht Type</th>
              <th className="th_job">Yacht Size</th>
              <th className="th_job">duration</th>
              <th className="th_job">Expiration Date</th>
              <th className="th_job">Created At</th>
              <th className="th_job">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="td_job">{item.jobTitle}</td>
                <td className="td_job">{item.designation}</td>
                <td className="td_job">{item.yachtType}</td>
                <td className="td_job">{item.yachtSize}</td>
                <td className="td_job">{item.duration}</td>
                <td className="td_job">
                  {new Date(item.expirationDate).toLocaleDateString("en-CA")}
                </td>
                <td className="td_job">
                  {new Date(item.created_at).toLocaleDateString("en-CA")}
                </td>
                <td className="td_job">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="button_job_edit_delete"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="button_job_edit_delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddJobForm;
