import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactGet() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchEnquiries = async () => {
    try {
      const response = await axios.get("/api/enquiries");
      setEnquiries(response.data.data); // Assuming API returns an array of enquiries
    } catch (err) {
      setError("Failed to fetch enquiries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch data from the API
 

    fetchEnquiries();
  }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <div>
        <div className="container">
      <h1>Contact Us</h1>
      <table className="table">
        <thead>
          <tr>
           
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Enquiry</th>
           
          </tr>
        </thead>
        <tbody>
          {enquiries &&
            enquiries?.map((enquiry) => (
              <tr key={enquiry.id}>
              
                <td>{enquiry.name || "N/A"}</td>
                <td>{enquiry.email || "N/A"}</td>
                <td>{enquiry.phone || "N/A"}</td>
                <td>{enquiry.subject || "N/A"}</td> 
                <td>{enquiry.enquiry || "N/A"}</td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ContactGet;
