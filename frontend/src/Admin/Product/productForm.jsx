import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons for Edit and Delete

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import "./productForm.css";
import Footer from "../../Components/Footer/Footer";

function ProductForm() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editClicked, setEditClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [cancelButton, setCancelButton] = useState(false);

  const [buttonText, setButtonText] = useState("Submit");
  const fileInputRef = useRef(null);

  const hotProductOptions = [
    {
      id: "0",
      value: 0,
      name: "False",
    },
    {
      id: "1",
      value: 1,
      name: "True",
    },
  ];
  // Fetch products when the component is mounted
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        if (response.data.message === "Products retrieved successfully!") {
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  const [formDataProduct1, setFormDataProduct1] = useState({
    title: "",
    hotProduct: "0",
    // categoryID: "",
    displayedDescription: "",
    amenitiesDescription: "",
    toysAndTendersDescription: "",
    interiorDesignDescription: "",
    navalArchitect: "",
    superstructureMaterial: "",
    currency_type: "USD",
    price: "",
    guests: "",
    crew: "",
    cabins: "",
    year: "",
    length: "",
    beam: "",
    exteriorDesigner: "",
    interiorDesigner: "",
    deckMaterial: "",
    builder: "",
    grossTonnage: "",
    draft: "",
    cruisingSpeed: "",

    hullMaterial: "",
    imageUpload: [],
    // image: [],
    exteriorDesignDescription: "",
  });

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleDescriptionChange = (value, product) => {
    // setFormDataProduct1({
    //   ...formDataProduct1,
    //   exteriorDesignDescription: value,
    // });
    setFormDataProduct1((prevData) => ({
      ...prevData,
      exteriorDesignDescription: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("handle check", e.target.value, "name", e.target.name);
    setFormDataProduct1((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get the selected files
    setFormDataProduct1((prevState) => ({
      ...prevState,
      imageUpload: [...prevState.imageUpload, ...newFiles], // Append new files
    }));
  };

  // const handleFileChange = (e, product) => {
  //   const files = Array.from(e.target.files); // Convert FileList to an array
  //   setFormDataProduct1({ ...formDataProduct1, imageUpload: files });
  // };

  useEffect(() => {
    // Fetch categories using Axios
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        if (response.data.message === "Categories retrieved successfully!") {
          setCategories(response.data.data);
          // console.log(response.data.data, "categories data");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (productId) => {
    // Show confirmation alert before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        // Make the DELETE request to the API
        const response = await axios.delete(`/api/delete-product/${productId}`);

        // Handle successful deletion (You can display a message or refresh the list)
        // console.log("Product deleted successfully:", response.data);

        // Optionally, update the state or perform other actions after deleting
        // For example, you can remove the deleted product from the products list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        // Handle error during deletion
        console.error("Error deleting product:", error);
        alert("Error deleting the product");
      }
    } else {
      // If the user canceled the deletion, you can log this or do nothing
      // console.log("Product deletion canceled");
    }
  };
  const handleEdit = async (productId) => {
    setCancelButton(true);

    setSelectedProduct(productId);

    setEditClicked(true);
    try {
      const response = await axios.get(`/api/product/${productId}`);
      // console.log("response check", response);
      if (response.data) {
        const imageUrls = response?.data?.data?.imageURL
          ? response?.data?.data?.imageURL.split(",")
          : [];
        // console.log(imageUrls, "url");
        setFormDataProduct1({
          title: response.data.data.title || "",
          hotProduct: response.data.data.hotProduct || "0",
          displayedDescription: response.data.data.displayedDescription || "",
          amenitiesDescription: response.data.data.amenitiesDescription || "",
          toysAndTendersDescription:
            response.data.data.toysAndTendersDescription || "",
          interiorDesignDescription:
            response.data.data.interiorDesignDescription || "",
          navalArchitect: response.data.data.navalArchitect || "",
          categoryID: response.data.data.categoryID || "",
          price: response.data.data.price || "",
          currency_type: response.data.data.currency_type || "",
          guests: response.data.data.guests || "",
          crew: response.data.data.crew || "",
          cabins: response.data.data.cabins || "",
          year: response.data.data.year || "",
          length: response.data.data.length || "",
          beam: response.data.data.beam || "",
          exteriorDesigner: response.data.data.exteriorDesigner || "",
          interiorDesigner: response.data.data.interiorDesigner || "",
          deckMaterial: response.data.data.deckMaterial || "",
          builder: response.data.data.builder || "",
          grossTonnage: response.data.data.grossTonnage || "",
          draft: response.data.data.draft || "",
          cruisingSpeed: response.data.data.cruisingSpeed || "",
          superstructureMaterial:
            response.data.data.superstructureMaterial || "",
          hullMaterial: response.data.data.hullMaterial || "",
          exteriorDesignDescription:
            response.data.data.exteriorDesignDescription || "",
          imageUpload: imageUrls, // Set image URLs array for preview
        });
        setButtonText("Update");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const handleRemoveImage = (index, imageUrl) => {
    console.log("Removing image at index:", index);
    console.log("Image URL:", imageUrl); // Log the URL to see if it's the full URL

    // Extract filename from the URL (get the last part after the last slash '/')
    const filename = imageUrl.split("/").pop(); // Extract filename only

    console.log("Extracted Filename:", filename);

    setImagesToDelete((prev) => [...prev, filename]);

    // Filter out the image at the specified index
    const updatedImages = formDataProduct1.imageUpload.filter(
      (_, i) => i !== index
    );

    // Update the state with the new array
    setFormDataProduct1((prevState) => ({
      ...prevState,
      imageUpload: updatedImages,
    }));
  };
  const handleCancel = () => {
    setCancelButton(false);
    setButtonText("Save");
    setFormDataProduct1({
      title: "",
      hotProduct: "0",
      // categoryID: "",
      displayedDescription: "",
      amenitiesDescription: "",
      toysAndTendersDescription: "",
      interiorDesignDescription: "",
      navalArchitect: "",
      superstructureMaterial: "",
      currency_type: "USD",
      price: "",
      guests: "",
      crew: "",
      cabins: "",
      year: "",
      length: "",
      beam: "",
      exteriorDesigner: "",
      interiorDesigner: "",
      deckMaterial: "",
      builder: "",
      grossTonnage: "",
      draft: "",
      cruisingSpeed: "",

      hullMaterial: "",
      imageUpload: [],
      // image: [],
      exteriorDesignDescription: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formDataProduct1.currency_type) {
      formDataProduct1.currency_type = "USD"; // Set to USD if not defined
    }
    if (!formDataProduct1.categoryID) {
      alert("Please select a category."); // Display an error message
      return;
    }
    if (!formDataProduct1?.exteriorDesignDescription?.trim()) {
      alert("Please enter a description."); // Display an error message
      return;
    }
    // console.log("form data hot", formDataProduct1.hotProduct);
    if (!formDataProduct1.hotProduct === "False") {
      alert("Please select a category."); // Display an error message
      return;
    }
    if (!selectedProduct && formDataProduct1.imageUpload.length === 0) {
      alert("Please upload at least one image.");
      return;
    } else if (selectedProduct && formDataProduct1.imageUpload.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    // Create a new FormData object
    const formData = new FormData();

    // formData.append("categoryID", selectedProduct);
    // Ensure you're using 'categoryId' consistently

    // Prepare the combined list of image URLs (from backend) and uploaded files
    const combinedImages = [
      ...formDataProduct1.imageUpload, // Newly uploaded files
    ];

    // Append the image files to FormData (if any)
    combinedImages.forEach((fileOrUrl, index) => {
      if (fileOrUrl instanceof File) {
        // If it's a File (newly uploaded image), append it as a file
        formData.append(`imageUpload[${index}]`, fileOrUrl);
      } else {
        // If it's a URL (from backend), append it as a string
        formData.append(`previousImageUploaded[${index}]`, fileOrUrl);
      }
    });

    // Append all other fields normally
    for (const key in formDataProduct1) {
      if (formDataProduct1[key] && key !== "imageUpload") {
        formData.append(key, formDataProduct1[key]);
      }
    }
    setIsLoading(true);
    if (imagesToDelete.length > 0) {
      formData.append("deletedImages", JSON.stringify(imagesToDelete)); // Send as a JSON array
    }

    try {
      const response = selectedProduct
        ? await axios.post(`/api/edit-product/${selectedProduct}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("/api/add-product", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      toast.success("Product saved successfully!");
      setButtonText("Save");
      // console.log("Product saved successfully:", response.data);
      if (selectedProduct) {
        setProducts((prevProducts) =>
          prevProducts?.map((product) =>
            product.id === selectedProduct
              ? { ...product, ...formDataProduct1 }
              : product
          )
        );
      } else {
        setProducts([...products, response.data.data]); // Add new product
      }
      setFormDataProduct1({
        title: "",
        hotProduct: "0",
        displayedDescription: "",
        amenitiesDescription: "",
        toysAndTendersDescription: "",
        interiorDesignDescription: "",
        navalArchitect: "",
        superstructureMaterial: "",
        price: "",
        currency_type: "",
        guests: "",
        crew: "",
        cabins: "",
        year: "",
        length: "",
        beam: "",
        exteriorDesigner: "",
        interiorDesigner: "",
        deckMaterial: "",
        builder: "",
        grossTonnage: "",
        draft: "",
        cruisingSpeed: "",
        superstructureMaterial: "",
        hullMaterial: "",
        imageUpload: [],
        exteriorDesignDescription: "",
        categoryID: "",
      });
      setSelectedProduct("");
      // setSelectedProduct("");

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      console.error("Error adding productq:", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      // Set loading state to false after the request is done
      setIsLoading(false);
      setCancelButton(false);
    }
  };
  // const handleRemoveImage = (index) => {}

  return (
    <>
      <ToastContainer />{" "}
      <div className="product-form container">
        <div className="row">
          <div className="col-6">
            {" "}
            <h2>ADD Product</h2>
          </div>
          <div className="col-6">
            <div className="form-group_jobform col-3">
              <label>Product Category</label>
              <select
                name="categoryID"
                value={formDataProduct1.categoryID} // Correctly bind categoryID
                required
                onChange={(e) =>
                  setFormDataProduct1({
                    ...formDataProduct1,
                    categoryID: e.target.value,
                  })
                }
                className="input-field_jobform"
              >
                <option value="">Select One</option>

                {/* Dynamically populate the options with category IDs */}
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {console.log(formDataProduct1)}

        <form onSubmit={handleSubmit}>
          <div>
            <div className="row m-0">
              <div className="form-group_jobform col-3">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formDataProduct1.title}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Hot Product</label>
                <select
                  name="hotProduct"
                  value={formDataProduct1.hotProduct}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                >
                  {/* <option value={0}>Select One</option> */}
                  {hotProductOptions?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group_jobform col-3">
                <label>Price</label>
                <div className="price-input-container">
                  <select
                    name="currency_type"
                    value={formDataProduct1.currency_type}
                    onChange={(e) => handleInputChange(e)}
                    className="currency_type-select_jobform"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>

                  <input
                    type="text"
                    name="price"
                    value={formDataProduct1.price}
                    required
                    onChange={(e) => handleInputChange(e)}
                    className="input-field_jobform"
                  />
                </div>
              </div>
              <div className="form-group_jobform col-3">
                <label>Displayed Description</label>
                <input
                  type="text"
                  name="displayedDescription"
                  value={formDataProduct1.displayedDescription}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="form-group_jobform col-3">
                <label>Guest</label>
                <input
                  type="text"
                  name="guests"
                  value={formDataProduct1.guests}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Crew</label>
                <input
                  type="text"
                  name="crew"
                  value={formDataProduct1.crew}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Cabins</label>
                <input
                  type="text"
                  name="cabins"
                  value={formDataProduct1.cabins}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  value={formDataProduct1.year}
                  onChange={(e) => handleInputChange(e)}
                  required
                  className="input-field_jobform"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="form-group_jobform col-3">
                <label>Length</label>
                <input
                  type="text"
                  name="length"
                  value={formDataProduct1.length}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Beam</label>
                <input
                  type="text"
                  name="beam"
                  value={formDataProduct1.beam}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Exterior Designer</label>
                <input
                  type="text"
                  name="exteriorDesigner"
                  value={formDataProduct1.exteriorDesigner}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Interior Designer</label>
                <input
                  type="text"
                  name="interiorDesigner"
                  value={formDataProduct1.interiorDesigner}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="form-group_jobform col-3">
                <label>Builder</label>
                <input
                  type="text"
                  name="builder"
                  value={formDataProduct1.builder}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Gross Tonnage</label>
                <input
                  type="text"
                  name="grossTonnage"
                  value={formDataProduct1.grossTonnage}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Draft</label>
                <input
                  type="text"
                  name="draft"
                  value={formDataProduct1.draft}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Cruising Speed</label>
                <input
                  type="text"
                  name="cruisingSpeed"
                  value={formDataProduct1.cruisingSpeed}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="form-group_jobform col-3">
                <label>Super Structure Material</label>
                <input
                  type="text"
                  name="superstructureMaterial"
                  value={formDataProduct1.superstructureMaterial}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Hull Material</label>
                <input
                  type="text"
                  name="hullMaterial"
                  value={formDataProduct1.hullMaterial}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Deck Material</label>
                <input
                  type="text"
                  name="deckMaterial"
                  value={formDataProduct1.deckMaterial}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Amenities Description</label>
                <input
                  type="text"
                  name="amenitiesDescription"
                  value={formDataProduct1.amenitiesDescription}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Toys And Tenders Description</label>
                <input
                  type="text"
                  name="toysAndTendersDescription"
                  value={formDataProduct1.toysAndTendersDescription}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>Naval Architect</label>
                <input
                  type="text"
                  name="navalArchitect"
                  value={formDataProduct1.navalArchitect}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
              <div className="form-group_jobform col-3">
                <label>interior Design Description</label>
                <input
                  type="text"
                  name="interiorDesignDescription"
                  value={formDataProduct1.interiorDesignDescription}
                  onChange={(e) => handleInputChange(e)}
                  // required
                  className="input-field_jobform"
                />
              </div>
            </div>
            <div className="form-row row">
              <div className="col-6">
                {console.log("check product", formDataProduct1)}
                {editClicked &&
                  formDataProduct1 &&
                  formDataProduct1?.imageUpload?.length > 0 &&
                  formDataProduct1?.imageUpload?.map((urls, ind) => {
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

              <div className="form-group col-6">
                <label>Image</label>
                <input
                  type="file"
                  name="imageUpload"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e)}
                />
                <small>
                  Multiple images can be added at once (jpg, png, jpeg)
                </small>
              </div>
            </div>

            <div className="form-group_jobform full-width_jobform mb-5">
              <label>Description:</label>
              <ReactQuill
                value={formDataProduct1.exteriorDesignDescription}
                onChange={(value) => handleDescriptionChange(value)}
                className={
                  !formDataProduct1?.exteriorDesignDescription?.trim()
                    ? "invalid"
                    : ""
                }
              />
              {!formDataProduct1?.exteriorDesignDescription?.trim() && (
                <small className="text-danger">This field is required.</small>
              )}
            </div>
          </div>

          {/* <button type="submit" className="save-button mt-3"> */}
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
          {/* <button type="submit" className="submit-button_addjob">
            {isLoading ? <div className="loader">Loading...</div> : "Submit"}
          </button> */}
        </form>
        <div className="container">
          <h2>Product List</h2>
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Guests</th>
                <th>Cabins</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products?.map((product, index) => (
                  <tr key={product?.id}>
                    {/* <td>{product.id}</td> */}
                    <td>{product?.title}</td>
                    <td>{product?.categoryID}</td>
                    <td>{product?.price}</td>
                    <td>{product?.guests}</td>
                    <td>{product?.cabins}</td>
                    <td>{product?.year}</td>
                    <td>
                      <td>
                        <button
                          className="button_job_edit_delete"
                          onClick={() => handleEdit(product.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="button_job_edit_delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>{" "}
                      {/* Add other buttons if needed */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductForm;
