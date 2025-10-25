import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./product-detail.css";
import image1 from "../../../Assets/Catalog/back.png";
import back from "../../../Assets/DetailPage/back1.png";
import back_detail from "../../../Assets/DetailPage/detail_img.png";
function ProductDetail({ images }) {


  return (
    <>
      <div>
        {/* Popup Component */}

        <Popup
          trigger={
            <div className="load_more_btn_pop_main">
          <button className="load_more_btn_pop">Show More</button>
          </div>
        }
          modal
          nested
        >
          {(close) => (
            <div className="popup-content">
                
              <div className="back_img_button">
                <img src={back} alt="back" className="close" onClick={close} />

                {/* <button className="enq_modal_btn"> Enquire</button> */}
              </div>
              <div className="popup-scrollable-content">
                <div className="show-more-pictures">
                  <div className="pictures">
                    {images &&
                      images.map((image, index) => (
                        <div
                          key={index}
                          className={`image-group ${
                            index % 3 === 0 ? "big" : "small"
                          }`}
                        >
                          <img
                                src={`${process.env.REACT_APP_BASE_URL}${image.trim().replace(/^https?:\/\/backend\.asiasuperyachts\.com/, '')}`}

                            // src={`${process.env.REACT_APP_BASE_URL}/${image.trim()}`}
                            alt={`image-${index}`}
                            className="img_css"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
}

export default ProductDetail;
