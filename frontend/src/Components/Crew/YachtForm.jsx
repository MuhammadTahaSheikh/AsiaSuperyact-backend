import React from 'react';
import './YachtForm.css';

const YachtForm = () => {
    return (
        <div className="container">
            <h2  className="positionh2">Yacht Information</h2>
            <form className="yacht-form">
                <div className="form-group">
                    <label>Yacht Type</label>
                    <input type="text" placeholder="Motor" />
                </div>
                <div className="form-group">
                    <label>Yacht Operation</label>
                    <input type="text" placeholder="Private" />
                </div>
                <div className="form-group">
                    <label>Yacht Name</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="form-group">
                    <label>Yacht Size</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="form-group">
                    <label>Ideal Start Date</label>
                    <input type="date" />
                </div>
                <div className="form-group">
                    <label>Basis</label>
                    <input type="text" placeholder="FULL TIME/SEASONAL" />
                </div>
                <div className="form-group">
                    <label>Flag</label>
                    <select>
                        <option>Please choose an option</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Preferred TCN Office</label>
                    <input type="text" placeholder="No Preference" />
                </div>
            </form>
        </div>
    );
};

export default YachtForm;
