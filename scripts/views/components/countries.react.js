import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Countries extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="country-container">
                <div className="flag-wrapper">
                    <ImageUploader />
                    <button className="button save-button">Save</button>
                </div>
                <div className="country-details">
                    <input type="text" placeholder="name" className="country-name" />
                </div>
            </div>
        );
    }
}

export default Countries;
