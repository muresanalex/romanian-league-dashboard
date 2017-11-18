import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import { getLeagues, getCountries } from "../../apiService/apiService";
import { getNames } from "../../helpers/helpers";

class Teams extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            leagues: [],
        };
    }

    componentDidMount() {
        getLeagues().then( ( leagues ) => this.setState( { leagues } ) );
        getCountries().then( ( countries ) => this.setState( { countries } ) );
    }

    render() {
        const { countries, leagues } = this.state;
        const countriesNames = getNames( countries );
        const leaguesNames = getNames( leagues );
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
                        <Dropdown elements={ countriesNames } label="country" />
                        <Dropdown elements={ leaguesNames } label="league" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Teams;
