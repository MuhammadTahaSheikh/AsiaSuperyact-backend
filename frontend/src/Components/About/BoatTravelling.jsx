import React from "react";
import "./BoatTravelling.css";
import yacht from "../../Assets/About/yacht.png";
import badge from "../../Assets/About/badge.png";
import rating from "../../Assets/About/rating.png";
import review from "../../Assets/About/customer-review.png";
function BoatTravelling({ handleEnquireClick }) {
  return (
    <div className="back_main">
      <div className="conatiner">
        <div className="row m-0">
          <div className="col-6"></div>
          <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
            <h1 className="boat_head">
              Your Boat <br />
              Travelling Starts
            </h1>
            <p className="boat_content">
              Viverra maecenas accumsan lacus vel facilisis volutpat est velit.
              Fusce id velit uttortor. Blandit libero volutpat sed cras ornare
              arcu dui. In nulla posuere sollicitudinaliquam ultrices.
            </p>
            <div className="top_content">
              <span>
                {" "}
                <img src={yacht} alt="yacht" />
                <span className="content_data">Premium Yacht</span>
              </span>
              <span>
                <img src={badge} alt="badge" />
                <span className="content_data">Professional Approach</span>
              </span>
            </div>
            <div className="top_content">
              <span>
                {" "}
                <img src={rating} alt="yacht" />
                <span className="content_data">Premium Yacht</span>
              </span>
              <span>
                <img src={review} alt="badge" />
                <span className="content_data">Professional Approach</span>
              </span>
            </div>
            <button className="enquire_boat_btn" onClick={handleEnquireClick}>ENQUIRE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoatTravelling;
