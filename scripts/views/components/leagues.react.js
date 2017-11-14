import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Leagues extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="league-container">
                <div className="league-logo">
                    <ImageUploader />
                    <button className="button save-button">Save</button>
                </div>
                <div className="league-details">
                    <input type="text" placeholder="name" className="league-name" />
                    <div className="dropdown-section">
                        <Dropdown elements={ [] } label="country" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Leagues;
