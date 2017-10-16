import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";

class Leagues extends Component {
    constructor() {
        super();
        this.state = {
            leagues: [ "Liga 1 Betano", "Liga 2" ],
            countries: [ "Romania", "Germany" ],
        };
    }

    render() {
        return (
            <div className="league-container">
                <div className="col-4">
                    <Dropdown elements={ this.state.leagues } />
                    <button className="button create-button">Create</button>
                    <button className="button remove-button">Remove</button>
                    <div className="logo-wrapper">
                        <ImageUploader />
                        <button className="button save-button">Save</button>
                    </div>
                </div>
                <div className="col-4 margin-top-large">
                    <input type="text" placeholder="name" className="league-name" />
                    <Dropdown elements={ this.state.countries } />
                </div>
            </div>
        );
    }
}

export default Leagues;
