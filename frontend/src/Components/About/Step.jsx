import React from "react";
import "./Step.css";
import test from "../../Assets/About/group_all.png";
function Step() {
  return (
    <div>
      <div className="container">
        <h1 className="step_heading mt-5 mb-5">
          Make 4 Simple Steps To <br />
          Buy a Yacht!
        </h1>

        <div className="check mb-5">
          <img src={test} className="w-100" />
        </div>
      </div>
    </div>
  );
}

export default Step;
