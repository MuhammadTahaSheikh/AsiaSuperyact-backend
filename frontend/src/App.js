import React, { useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import AllComponent from "./AllComponent";
import Contact from "./Components/ContactUs/Contact";
import Catalog from "./Components/Catalog/Catalog";
import About from "./Components/About/About";
import DetailPage from "./Components/Catalog/DetailPage";
import CharterYachts from "./Components/Catalog/CharterYachts/CharterYachts";
import PropertySale from "./Components/Catalog/PropertySale/PropertySale";
import Crew from "./Components/Crew/Crew";
import JobPostDetail from "./Components/Crew/JobPostDetail";
import LookingforCrew from "./Components/Crew/LookingforCrew";
import AddJobForm from "./Admin/Job/job";
import ProductForm from "./Admin/Product/productForm";
import { HomePage } from "./Admin/HomePage/HomePage";
import SignIn from "./Admin/SignIn/SignIn";
import AddHome from "./Admin/HomePage/AddHome";
import PropertyDetail from "./Components/Catalog/PropertyDetail";
function App() {
  const mySectionRef = useRef(null);

  const handleEnquireClick = () => {
    if (mySectionRef && mySectionRef?.current) {
      mySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AllComponent
                mySectionRef={mySectionRef}
                handleEnquireClick={handleEnquireClick}
              />
            }
          />
          <Route exact path="/contact-us" element={<Contact />} />
          <Route exact path="/yacht-for-sale" element={<Catalog     mySectionRef={mySectionRef}
                handleEnquireClick={handleEnquireClick}/>} />
          <Route
            exact
            path="/charter-yachts"
            element={
              <CharterYachts
                mySectionRef={mySectionRef}
                handleEnquireClick={handleEnquireClick}
              />
            }
          />
          <Route exact path="/property-for-sale" element={<PropertySale     mySectionRef={mySectionRef}
                handleEnquireClick={handleEnquireClick}/>} />
          <Route
            exact
            path="/about-us"
            element={
              <About
                mySectionRef={mySectionRef}
                handleEnquireClick={handleEnquireClick}
              />
            }
          />
          <Route exact path="/detail-page" element={<DetailPage />} />
          <Route exact path="/detail-property-page" element={<PropertyDetail/>} />
          <Route exact path="/looking-for-job" element={<Crew />} />
          <Route exact path="/looking-for-crew" element={<LookingforCrew />} />
          <Route path="/job-details/:jobId" element={<JobPostDetail />} />

          <Route path="/add-job" element={<AddJobForm />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/add-home" element={<HomePage/>} />
          <Route path="/add-home1" element={<AddHome/>} />
          <Route path="/sign-in" element={<SignIn/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
