import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Teams extends Component {
    constructor() {
        super();
        this.state = {
            leagues: [ "Liga 1 Betano", "Liga 2" ],
            countries: [ "Romania", "Germany" ],
            teams: [ "Dinamo" ],
        };
    }

    render() {
        return (
            <div className="team-container">
                <div className="col-4">
                    <Dropdown elements={ this.state.teams } />
                    <button className="button create-button">Create</button>
                    <button className="button remove-button">Remove</button>
                    <div className="logo-wrapper">
                        <ImageUploader />
                        <button className="button save-button">Save</button>
                    </div>
                </div>
                <div className="col-4 margin-top-large">
                    <input type="text" placeholder="name" className="team-name" />
                    <input type="text" placeholder="stadium" className="team-stadium" />
                    <Dropdown elements={ this.state.countries } />
                    <Dropdown elements={ this.state.leagues } />
                </div>
            </div>
        );
    }
}

export default Teams;
