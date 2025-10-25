import React, { useState, useEffect } from "react";
import axios from "axios";

function AddGallery() {
  const [images, setImages] = useState([]); // State for selected images
  const [galleryData, setGalleryData] = useState([]); // State for gallery data
  const [loading, setLoading] = useState(false); // Loading state

  // Step 1: Handle image selection
  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    const imageUrls = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Step 2: Handle form submission (Save button)
  const handleSave = async () => {
    if (images.length === 0) {
      alert("Please select some images.");
      return;
    }

    const formData = new FormData();

    // Append all selected files under the same field name ('imageUpload')
    Array.from(images).forEach((imageUrl, index) => {
      const imageFile =
        document.querySelectorAll('input[type="file"]')[0].files[index]; // Get the actual image file
      formData.append("imageUpload[]", imageFile); // Append all images under 'imageUpload[]' (array syntax)
    });

    try {
      setLoading(true); // Set loading state to true

      // Make POST request to server with FormData
      const response = await axios.post("/api/add-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to indicate file upload
        },
      });

      // If successful, alert the user and reset the image state
      alert("Images uploaded successfully!");

      // Fetch the gallery data after uploading the images
      fetchGalleryData();
      setImages([]);
      document.querySelector('input[type="file"]').value = "";
      setLoading(false); // Reset loading state
    } catch (error) {
      setLoading(false); // Reset loading state
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  // Step 3: Fetch existing gallery data
  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("/api/gallery");

      // Log the response to check its structure
      console.log("Gallery data response:", response.data);

      // Assuming the gallery data is in response.data.data (adjust based on your actual API structure)
      if (Array.isArray(response.data.data)) {
        setGalleryData(response.data.data); // Set the galleryData to the 'data' array
      } else {
        console.error("API response does not contain an array.");
      }
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  // Step 4: Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete-gallery/${id}`);
      alert("Image deleted successfully!");
      fetchGalleryData(); // Refresh the gallery data after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  // Step 5: Handle edit action (can be extended to update images if needed)
  const handleEdit = (id) => {
    alert("Edit functionality will be implemented here.");
  };

  useEffect(() => {
    // Fetch existing gallery data when the component is mounted
    fetchGalleryData();
  }, []);

  return (
    <div className="container">
      <h1>Add Gallery</h1>

      {/* Image Upload Input */}
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />
        <p style={{ fontSize: "14px", color: "#555" }}>
          Choose multiple images
        </p>
      </div>

      {/* Display Selected Images */}
      <div
        className="gallery-preview"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ width: "100px", height: "100px", position: "relative" }}
          >
            <img
              src={image}
              alt={`preview-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSave}
          className="add_home_reach_btn"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Save"}
        </button>
      </div>

      {/* Display Gallery Data in Table */}
      <div style={{ marginTop: "30px" }}>
        <h2>Gallery</h2>
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {galleryData.length === 0 ? (
              <tr>
                <td colSpan="3">No gallery images available.</td>
              </tr>
            ) : (
              galleryData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imageURL}
                      alt="Gallery"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>
                    {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddGallery;
