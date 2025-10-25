import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddHome() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Step 1: Create state for form data and table data
  const [formData, setFormData] = useState({
    id: "",   // Add ID field for editing purposes
    address: "",
    email: "",
    phone: "",
  });
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Step 2: Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Step 3: Handle form submission (Save or Update button)
  const handleSave = async () => {
    if (formData.address && formData.email && formData.phone) {
      setLoading(true); // Set loading state to true while submitting

      const { id, address, email, phone } = formData;
      const dataToSave = { address, email, phone };

      try {
        if (id) {
          // If id exists, update the data (PUT request)
          const response = await axios.put(`/api/edit-reach-out/${id}`, dataToSave, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          // Update the table data with the edited response
          setTableData((prevData) => prevData.map((item) =>
            item.id === id ? { ...item, address, email, phone } : item
          ));
        } else {
          // If no id, create new data (POST request)
          const response = await axios.post("/api/add-reach-out", dataToSave, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          // Add the new entry to the table
          setTableData((prevData) => [
            ...prevData,
            {
              ...response.data,
              createdAt: new Date().toLocaleString(),
            },
          ]);
        }

        // Clear the form after saving or updating
        setFormData({ id: "", address: "", email: "", phone: "" });
      } catch (error) {
        console.error("Error saving data:", error);
        // alert("Error saving data. Please try again.");
      }

      setLoading(false); // Reset loading state after submission
    } else {
      // alert("Please fill out all fields.");
    }
  };

  // Step 4: Handle row deletion
  const handleDelete = async (index) => {
    const id = tableData[index].id; // Assuming each entry has an 'id'
    try {
      await axios.delete(`/api/delete-reach-out/${id}`);
      setTableData((prevData) => prevData.filter((_, i) => i !== index));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      // alert("Error deleting data. Please try again.");
    }
  };

  // Step 5: Handle row edit (populate form with data for editing)
  const handleEdit = (index) => {
    const entry = tableData[index];
    setFormData({
      id: entry.id,        // Set the ID for editing
      address: entry.address,
      email: entry.email,
      phone: entry.phone,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to the root page if no token is found
    }
    const fetchTableData = async () => {
      try {
        const response = await axios.get("/api/reach-out");
        setTableData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // alert("Failed to fetch data. Please try again.");
      }
    };

    fetchTableData();
  }, [navigate]);

  return (
    <div className="container">
      <div className="row">
        <h2>Reach out</h2>
        {/* Form Fields */}
        <div className="form-group_jobform col-6">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="input-field_jobform"
          />
        </div>
        <div className="form-group_jobform col-6">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field_jobform"
          />
        </div>
        <div className="form-group_jobform col-6">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field_jobform"
          />
        </div>
        <div className="form-group_jobform col-3"></div>
        <div className="form-group_jobform col-3 justify-content-end">
          <button className="add_home_reach_btn" onClick={handleSave}>
            {formData.id ? "Update" : "Save"} {/* Change button text based on edit or save */}
          </button>
        </div>
      </div>

      {/* Display Table */}
      <div className="table-section" style={{ marginTop: "30px" }}>
        <h3>Saved Data</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={data.id}>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.createdAt && new Date(data.createdAt).toISOString().split('T')[0] || "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddHome;
