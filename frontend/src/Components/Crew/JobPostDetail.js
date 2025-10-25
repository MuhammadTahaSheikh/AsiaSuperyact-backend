import React, { useEffect, useRef, useState } from "react";
import "./JobPostDetailPage.css";
import { useParams } from "react-router-dom";

import axios from "axios";

import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import category from "../../Assets/Crew/Detal_page/category.png";
import experience from "../../Assets/Crew/Detal_page/experience.png";

import expiration from "../../Assets/Crew/Detal_page/expiration.png";
import gender from "../../Assets/Crew/Detal_page/gender.png";
import pin from "../../Assets/Crew/Detal_page/location.png";
import offered from "../../Assets/Crew/Detal_page/offered.png";
import qualification from "../../Assets/Crew/Detal_page/qualification.png";
import yacht from "../../Assets/Crew/Detal_page/yacht.png";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function JobPostDetail() {
  const { jobId } = useParams();
  const [loadingForm, setLoadingForm] = useState(false); // Loader state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const titles = ["", "Qualification:", "Experience:", "Yacht Size:"];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(" jobId", jobId);
  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUpload: null,
    jobTitle: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setFormData((prevState) => ({
      ...prevState,
      resumeUpload: file, // Set resume file in state
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resumeUpload) {
      alert("Please upload your resume.");
      return;
    }
    console.log("Form Data Before Submit:", formData);

    // Create a FormData object to handle the file upload
    const formToSubmit = new FormData();
    formToSubmit.append("name", formData.name);
    formToSubmit.append("email", formData.email);
    formToSubmit.append("phone", formData.phone);
    formToSubmit.append("resumeUpload", formData.resumeUpload);
    formToSubmit.append("jobTitle", formData.jobTitle);
    setLoadingForm(true);
    try {
      const response = await axios.post(
        "/api/add-job-submission",
        formToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        toast.success("Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          resumeUpload: "",
        });
        closeModal();
      }
    } catch (error) {
      toast.error(error.response.data.errors.resumeUpload[0]);
      // console.log("form error", error.response.data.errors.resumeUpload[0]);
      console.error("Error submitting the form", error);
      alert(error.response.data.errors.resumeUpload[0]);
    } finally {
      setLoadingForm(false); // Stop the loader
    }
  };

  const appointmentRef = useRef(null);

  const scrollToAppointment = () => {
    if (appointmentRef.current) {
      appointmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
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

  const location = useLocation();
  // const { jobId } = location.state; // Get jobId from the state
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/job/${jobId}`);
        setJob(response.data.data); // Adjusted based on the API response structure
        console.log("job detail", response.data.data);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  // if (loading) return <p>Loading job details...</p>;
  // if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <span>&uarr;</span>
          </button>
        )}
      </>
      <>
        <Navbar />
      </>
      <>
        <div className="main_div_designation">
          <div className="row m-0 p-0">
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
            <div className="col-lg-8 col-md-9 col-sm-12 col-12">
              <div className="row p-0 m-0 ">
                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                  <div className="main_description_designation">
                    {loading ? (
                      <p>Loading job details...</p>
                    ) : !job ? (
                      <p>Job not found.</p>
                    ) : (
                      <>
                        <p className="header_designation">{job.title}</p>
                        <p>{job.location}</p>
                        <div className="d-flex justify-content-start gap-5 mb-3">
                          {" "}
                          {job.info &&
                            job.info.map((item, i) => (
                              <li className="list_decoration_detail" key={i}>
                                {titles[i]}
                                {item}
                              </li>
                            ))}
                        </div>

                        <p className="description_heading">Description</p>
                        <p className="description_para_designation">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: job?.description,
                            }}
                          />
                          {/* {job.description} */}
                        </p>

                        <p className="description_heading">Requirements</p>
                        <p className="description_para_designation">
                          {/* {job.requirements} */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: job?.requirements,
                            }}
                          />
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-12 px-2">
                  <div className="hr_blue_second_div" />
                  <p className="heading_interested_injob">
                    Interested in this job?
                  </p>
                  <p className="para_interested">
                    Application deadline has expired
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="apply_now_interested"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={openModal}
                    >
                      Apply Now
                    </button>
                    {isModalOpen && (
                      <div
                        className="modal fade show"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        style={{ display: "block" }}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-body">
                              <p className="apply_job_heading_modal">
                                Apply for Job "{job.title}"
                              </p>
                              <p className="apply_job_para_modal">
                                Kindly fill the information
                              </p>
                              <input
                                name="name"
                                className="input_model_job_apply"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                              <input
                                name="email"
                                className="input_model_job_apply"
                                placeholder="E-Mail"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                              <input
                                name="phone"
                                className="input_model_job_apply"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                              />
                              <input
                                type="file"
                                className="input_model_job_applyupload"
                                onChange={handleFileChange}
                              />
                              <button
                                type="button"
                                className="submit_apply_job_model"
                                onClick={handleSubmit}
                                disabled={loadingForm} // Assuming you still want to handle form submission
                              >
                                {loadingForm ? "Submitting..." : "Submit"}
                              </button>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={closeModal} // Close the modal
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="hr_line_below_aply_now" />
                  <div className="over_view_main">
                    <p className="over_view_heading">Overview</p>

                    {/* <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={category} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Categories</p>
                        <p className="para_overview_para">{job.jobCategory}</p>
                      </div>
                    </div> */}

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={yacht} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Yacht Size</p>
                        <p className="para_overview_para">
                          {job?.info[3] || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={yacht} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Date Posted</p>
                        <p className="para_overview_para">
                          {new Date(job?.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={pin} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Location</p>
                        <p className="para_overview_para">
                          {" "}
                          {job?.location || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={offered} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Offered Salary</p>
                        <p className="para_overview_para">
                          {" "}
                          {job?.offeredSalary || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={expiration} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Expiration date</p>
                        <p className="para_overview_para">
                          {new Date(job?.expirationDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={experience} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Experience</p>
                        <p className="para_overview_para">
                          {job?.info[2] || "N/A"} Year
                        </p>
                      </div>
                    </div>
                    <div className="row m-0 p-0">
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <img className="icon_overview" src={gender} />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <p className="heading_overview_para">Gender</p>
                        <p className="para_overview_para">
                          {job?.gender || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
}

export default JobPostDetail;
