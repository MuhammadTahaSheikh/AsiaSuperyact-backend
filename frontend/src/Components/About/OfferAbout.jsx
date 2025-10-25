import React from 'react';
import './OfferAbout.css';
import review from "../../Assets/About/customer-review.png"
import rating from "../../Assets/About/rating.png"
import offer_second from "../../Assets/About/second_col.png"
function OfferAbout({ handleEnquireClick }) {
  return (
    <div className="offer-about-container">
      <div className="offer-content">
        <div className="offer-text">
          <h5>Pricing & Plan</h5>
          <h1>ASIA SUPERYACHTS OFFER</h1>
          <p className='asia_offer_content'>
            25 Years Of Sales & Charter Experience Have Taught Us The Many Pitfalls 
            (And How to Avoid Them) For International Yacht Purchase / Acquisition. 
            Our Guarantee To You Is We Will Do All In Our Power To Ensure Your Yacht 
            Purchase Or Charter Is Smooth Clear, Easy To Action And Quick.
          </p>
          <div className="offer-icons">
            <div className="icon">
              <img src={review} alt="Priceless Experience" />
              <p className='price_content_offer'>Priceless Experience</p>
            </div>
            <div className="icon">
              <img src={rating} alt="Quality Service" />
              <p className='price_content_offer'>Quality Service</p>
            </div>
          </div>
          <button className="enquire-btn" onClick={handleEnquireClick}>Enquire</button>
        </div>
        <div className="offer-image">
          <img src={offer_second} alt="Yacht" />
        </div>
      </div>
    </div>
  );
}

export default OfferAbout;
