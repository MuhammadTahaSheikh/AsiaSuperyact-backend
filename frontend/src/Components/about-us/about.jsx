import React from 'react'
import Cards from './about-us-cards'
import "./about-us.css"

function about() {
  return (
    <div className='about-us mb-5'>
        <div className='about-us-content'>
            <h3 className='about-us-h3 mb-4'>About Us</h3>
            <p className='about-us-p'>Asia Superyachts Ltd was formed 25 years ago initially in a beautiful beachfront restaurant in Bali Indonesia called KU DE TA by 2 Superyacht Captains and a corporate flight crew stewardess. From its inception on day 1 our goal was to bring superyachts and elegance to Asia from the overcrowded and busy mediterranean to the beautful islands of Indonesia, Thailand, Singapore, Malaysia, Philippines and Vietnam. Our goal was to bring high end Superyachts and service the needs of captains and owners alike to the same standard they would expect in the mediterranean or USA. </p>
        </div>
        <div className='about-us-pictures'>
             <Cards/>
        </div>
    </div>
  )
}

export default about