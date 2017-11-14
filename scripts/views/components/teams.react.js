import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Teams extends Component {
    constructor() {
        super();
        this.state = { };
    }

    render() {
        return (
            <div className="team-container">
                <div className="team-logo">
                    <div className="logo-wrapper">
                        <ImageUploader />
                        <button className="button save-button">Save</button>
                    </div>
                </div>
                <div className="team-details">
                    <input type="text" placeholder="name" className="team-name" />
                    <input type="text" placeholder="stadium" className="team-stadium" />
                    <div className="dropdown-section">
                        <Dropdown elements={ [] } label="country" />
                        <Dropdown elements={ [] } label="league" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Teams;
