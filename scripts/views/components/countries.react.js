import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Countries extends Component {
    constructor() {
        super();
        this.state = {
            countries: [ "Romania", "Germany" ],
        };
    }

    render() {
        return (
            <div className="countries-container">
                <div className="col-4">
                    <Dropdown elements={ this.state.countries } />
                    <button className="button create-button">Create</button>
                    <button className="button remove-button">Remove</button>
                    <div className="flag-wrapper">
                        <ImageUploader />
                        <button className="button save-button">Save</button>
                    </div>
                </div>
                <div className="col-4 margin-top-large">
                    <input type="text" placeholder="name" className="country-name" />
                </div>
            </div>
        );
    }
}

export default Countries;
