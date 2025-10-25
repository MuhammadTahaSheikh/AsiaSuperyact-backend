import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pictureGallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`api/gallery`);
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <>
      <p className="picture_heading">Picture Gallery</p>
      <div className="gallery container">
        {images?.slice(0, 8).map((image) => (
          <div className="gallery-item" key={image.id}>
            <img
              src={image.imageURL}
              alt={`Gallery Item ${image.id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
