import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons for Edit and Delete

const Property = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    year_built: "",
    living_area_sqft: "",
    bedrooms: "",
    bathrooms: "",
    no_of_units: "",
    last_sale_date: "",
    property_vacant: false, // boolean for checkbox
    mail_vacant: false, // boolean for checkbox
    owner_name: "",
    apn: "",
    owner_type: "",
    ownership_length: "",
    owner_occupied: false, // boolean for checkbox
    skiped_traced: false, // boolean for checkbox
    opt_out: false, // boolean for checkbox
    estimated_rent: "",
    capacity: "",
    address: "",
    estimated_value: "",
    confidence_score: "",
    estimated_equity: "",
    imageURL: [],
    imageUpload: [],
  });
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [cancelButton, setCancelButton] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");

  const [editClicked, setEditClicked] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);

  const baseUrl = `${process.env.REACT_APP_BASE_URL}api/property`;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    const value =
      type === "checkbox" ? (checked ? true : false) : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get(baseUrl);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  const handleCancel = () => {
    setCancelButton(false);
    setButtonText("Save");
    setFormData({
      year_built: "",
      living_area_sqft: "",
      bedrooms: "",
      bathrooms: "",
      no_of_units: "",
      last_sale_date: "",
      property_vacant: false, // boolean for checkbox
      mail_vacant: false, // boolean for checkbox
      owner_name: "",
      apn: "",
      owner_type: "",
      ownership_length: "",
      owner_occupied: false, // boolean for checkbox
      skiped_traced: false, // boolean for checkbox
      opt_out: false, // boolean for checkbox
      estimated_rent: "",
      capacity: "",
      address: "",
      estimated_value: "",
      confidence_score: "",
      estimated_equity: "",
      imageURL: [],
      imageUpload: [],
    });
  };
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    // Ensure proper formatting for required fields
    const formattedData = {
      ...formData,
      living_area_sqft: parseInt(formData.living_area_sqft) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      ownership_length: parseInt(formData.ownership_length) || 0,
      capacity: parseInt(formData.capacity) || 0,
      last_sale_date: formData.last_sale_date || null, // Use null if not provided
    };

    // Append formatted data to payload
    for (const key in formattedData) {
      if (key === "imageUpload") {
        formattedData.imageUpload.forEach((file, index) => {
          if (file instanceof File) {
            payload.append(`imageUpload[${index}]`, file);
          } else {
            // If it's a URL (from backend), append it as a string
            payload.append(`previousImageUploaded[${index}]`, file);
          }
        });
      } else if (
        formattedData[key] !== undefined &&
        formattedData[key] !== null
      ) {
        if (typeof formattedData[key] === "boolean") {
          payload.append(key, formattedData[key] ? "1" : "0");
        } else {
          payload.append(key, formattedData[key]);
        }
      }
    }
    if (imagesToDelete.length > 0) {
      payload.append("deletedImages", JSON.stringify(imagesToDelete)); // Send as a JSON array
    }
    setIsLoading(true);
    try {
      if (editId) {
        // console.log("payload", payload);
        // Update property
        await axios.post("api/edit-property/" + editId, payload);
      } else {
        // Create property
        await axios.post(baseUrl, payload);
      }
      setButtonText("Save");
      fetchProperties(); // Refresh the list of properties
      resetForm(); // Clear the form
    } catch (error) {
      console.error("Error saving property", error);
      if (error.response && error.response.data.errors) {
        console.log("Validation errors:", error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveImage = (index, imageUrl) => {
    // Log the URL to see if it's the full URL

    // Extract filename from the URL (get the last part after the last slash '/')
    const filename = imageUrl.split("/").pop(); // Extract filename only

    // console.log("Extracted Filename:", filename);

    setImagesToDelete((prev) => [...prev, filename]);

    // Filter out the image at the specified index
    const updatedImages = formData?.imageUpload?.filter((_, i) => i !== index);

    // Update the state with the new array
    setFormData((prevState) => ({
      ...prevState,
      imageUpload: updatedImages,
    }));
  };
  // const handleFileChange = (e) => {
  //   const newFiles = Array.from(e.target.files); // Get the selected files
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     imageUpload: prevState.imageUpload
  //       ? [...prevState.imageUpload, ...newFiles]
  //       : newFiles, // Ensure it's an array before appending
  //   }));
  // };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get the selected files
    setFormData((prevState) => ({
      ...prevState,
      imageUpload: [...prevState.imageUpload, ...newFiles], // Append new files
    }));
  };
  // Reset form
  const resetForm = () => {
    setFormData({
      year_built: "",
      living_area_sqft: "",
      bedrooms: "",
      bathrooms: "",
      no_of_units: "",
      last_sale_date: "",
      property_vacant: false, // reset to false
      mail_vacant: false, // reset to false
      owner_name: "",
      apn: "",
      owner_type: "",
      ownership_length: "",
      owner_occupied: false, // reset to false
      skiped_traced: false, // reset to false
      opt_out: false, // reset to false
      estimated_rent: "",
      capacity: "",
      address: "",
      estimated_value: "",
      confidence_score: "",
      estimated_equity: "",
      imageURL: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    setEditId(null);
  };

  // Edit property
  const handleEdit = (property) => {
    setCancelButton(true);
    setEditClicked(true);
    // console.log("check property", property);
    setFormData({
      ...property,
      imageUpload: property?.imageURL ? property?.imageURL.split(",") : [],
      // imageUpload: [],
      // Reset the imageUpload field, as we're editing, not uploading new images yet
    });
    setButtonText("Update");
    setEditId(property.id);
  };

  // Delete property
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!isConfirmed) return;
    try {
      await axios.delete(`${baseUrl}/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="container">
      <h1>Property Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="row m-0">
          {/* Year Built */}
          <div className="col-3 mt-3">
            <label>Year Built</label>
            <input
              type="number"
              name="year_built"
              value={formData.year_built}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Living Area (sqft) */}
          <div className="col-3 mt-3">
            <label>Living Area (sqft)</label>
            <input
              type="number"
              name="living_area_sqft"
              value={formData.living_area_sqft}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Bedrooms */}
          <div className="col-3 mt-3">
            <label>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Bathrooms */}
          <div className="col-3 mt-3">
            <label>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Number of Units */}
          <div className="col-3 mt-3">
            <label>Number of Units</label>
            <input
              type="number"
              name="no_of_units"
              value={formData.no_of_units}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Last Sale Date */}
          <div className="col-3 mt-3">
            <label>Last Sale Date</label>
            <input
              type="date"
              name="last_sale_date"
              value={formData.last_sale_date}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Property Vacant */}

          {/* Owner Name */}
          <div className="col-3 mt-3">
            <label>Owner Name</label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* APN */}
          <div className="col-3 mt-3">
            <label>APN</label>
            <input
              type="text"
              name="apn"
              value={formData.apn}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* Mail Vacant */}
          <div className="col-3 mt-3">
            <label>Mail Vacant</label>
            <input
              type="checkbox"
              name="mail_vacant"
              checked={formData.mail_vacant}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>
          <div className="col-3 mt-3">
            <label>Property Vacant</label>
            <input
              type="checkbox"
              name="property_vacant"
              checked={formData.property_vacant}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>

          {/* Owner Occupied */}
          <div className="col-3 mt-3">
            <label>Owner Occupied</label>
            <input
              type="checkbox"
              name="owner_occupied"
              checked={formData.owner_occupied}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>

          {/* Skip Traced */}
          <div className="col-3 mt-3">
            <label>Skip Traced</label>
            <input
              type="checkbox"
              name="skiped_traced"
              checked={formData.skiped_traced}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>

          {/* Opt-Out */}
          <div className="col-3 mt-3">
            <label>Opt-Out</label>
            <input
              type="checkbox"
              name="opt_out"
              checked={formData.opt_out}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>

          {/* Estimated Rent */}
          <div className="col-3 mt-3">
            <label>Estimated Rent</label>
            <input
              type="text"
              name="estimated_rent"
              value={formData.estimated_rent}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* Owner Type */}
          <div className="col-3 mt-3">
            <label>Owner Type</label>
            <input
              type="text"
              name="owner_type"
              value={formData.owner_type}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Ownership Length */}
          <div className="col-3 mt-3">
            <label>Ownership Length</label>
            <input
              type="text"
              name="ownership_length"
              value={formData.ownership_length}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* Capacity */}
          <div className="col-3 mt-3">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              min="0"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Address */}

          {/* Estimated Value */}
          <div className="col-3 mt-3">
            <label>Estimated Value</label>
            <input
              type="text"
              name="estimated_value"
              value={formData.estimated_value}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Confidence Score */}
          <div className="col-3 mt-3">
            <label>Confidence Score</label>
            <input
              type="text"
              name="confidence_score"
              value={formData.confidence_score}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Estimated Equity */}
          <div className="col-3 mt-3">
            <label>Estimated Equity</label>
            <input
              type="text"
              name="estimated_equity"
              value={formData.estimated_equity}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-6 mt-3">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="form-control"
            ></textarea>
          </div>
          {/* Image URL */}
          <div className="form-group col-6 mt-3">
            <label>Image</label>
            <input
              type="file"
              name="imageUpload"
              multiple
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e)}
              required={!editId}
            />
            <small>
              Multiple imageUpload can be added at once (jpg, png, jpeg)
            </small>
          </div>
        </div>
        <div className="col-6">
          {/* {console.log("check form data", formData)} */}
          {editClicked &&
            formData &&
            formData?.imageUpload?.length > 0 &&
            formData?.imageUpload?.map((urls, ind) => {
              return (
                <div
                  key={ind}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "10px",
                  }}
                >
                  <img
                          src={urls.split('/').map((part, index) => 
                            index === urls.split('/').length - 1 ? part.replace(/ /g, '%20') : part
                          ).join('/')}
                          alt="Uploaded Images"
                          height="150px"
                          width="150px"
                        />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveImage(ind, urls)} // Pass index to the handler
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <button
          type="submit"
          className="submit-button_addjob mt-3 m-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span> // You can replace this with a spinner icon
          ) : (
            buttonText
          )}
        </button>
        {cancelButton && (
          <button
            type="button"
            className="submit-button_addjob mt-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        {/* <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button> */}
      </form>

      <div className="mt-5">
        <h2>Properties List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Year Built</th>
              <th>Living Area (sqft)</th>
              <th>Number of Units</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties &&
              properties?.map((property) => (
                <tr key={property.id}>
                  <td>{property.year_built}</td>
                  <td>{property.living_area_sqft}</td>
                  <td>{property.no_of_units}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>
                    <button
                      className="button_job_edit_delete"
                      onClick={() => handleEdit(property)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="button_job_edit_delete"
                      onClick={() => handleDelete(property.id)}
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

export default Property;
