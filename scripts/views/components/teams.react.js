import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import {
    getLeagues,
    getCountries,
    createTeam,
} from "../../apiService/apiService";
import { getNames, getId } from "../../helpers/helpers";

class Teams extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            leagues: [],
            teamName: "",
            stadium: "",
        };
        this.handleClick = this.handleClick.bind( this );
        this.handleNameChange = this.handleNameChange.bind( this );
        this.handleStadiumChange = this.handleStadiumChange.bind( this );
    }

    componentDidMount() {
        getLeagues().then( ( leagues ) => this.setState( { leagues: leagues.data } ) );
        getCountries().then( ( countries ) => this.setState( { countries: countries.data } ) );
    }

    handleNameChange( evt ) {
        this.setState( {
            teamName: evt.target.value,
        } );
    }

    handleStadiumChange( evt ) {
        this.setState( {
            stadium: evt.target.value,
        } );
    }

    clearInputFields() {
        this.name.value = "";
        this.stadium.value = "";
    }

    handleClick() {
        const { teamName, stadium, countries, leagues } = this.state;
        const leagueId = getId( leagues, this.league.getSelectedValue() );
        const countryId = getId( countries, this.country.getSelectedValue() );
        createTeam( {
            name: teamName,
            stadium,
            leagueId,
            countryId,
        } );
        this.clearInputFields();
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
                        <button
                            className="button save-button"
                            onClick={ this.handleClick }
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="team-details">
                    <input
                        type="text"
                        placeholder="name"
                        className="team-name"
                        onChange={ this.handleNameChange }
                        ref={ ( ref ) => { this.name = ref; } }
                    />
                    <input
                        type="text"
                        placeholder="stadium"
                        className="team-stadium"
                        onChange={ this.handleStadiumChange }
                        ref={ ( ref ) => { this.stadium = ref; } }
                    />
                    <div className="dropdown-section">
                        <Dropdown
                            elements={ countriesNames }
                            label="country"
                            ref={ ( ref ) => { this.country = ref; } }
                        />
                        <Dropdown
                            elements={ leaguesNames }
                            label="league"
                            ref={ ( ref ) => { this.league = ref; } }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Teams;
