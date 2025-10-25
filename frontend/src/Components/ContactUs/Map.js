import React from "react";
import "./Map.css"
function Map() {
    return (
        <div className='main_div_map_hoempage'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-12 p-0 mt-5 '>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9379497309005!2d-0.11430488703319416!3d51.51435437169736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876051977970d55%3A0x7aaceebd13d09d2b!2s7%20Bell%20Yard%2C%20London%20WC2A%202JR%2C%20UK!5e0!3m2!1sen!2s!4v1729611977030!5m2!1sen!2s"
              width="100%"
              height="480"
              className='map_setting_style'
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
          </div>
          
        </div>
        </div>
      );
    }

export default Map
