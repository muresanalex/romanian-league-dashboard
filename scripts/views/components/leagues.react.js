import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import { getCountries, createLeague } from "../../apiService/apiService";
import { getId, getNames } from "../../helpers/helpers";

class Leagues extends Component {
    constructor() {
        super();
        this.state = {
            leagueName: "",
            countries: [],
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleClick = this.handleClick.bind( this );
    }

    componentDidMount() {
        getCountries()
            .then( ( countries ) => this.setState( { countries: countries.data } ) );
        this.clearInput();
    }

    handleChange( evt ) {
        this.setState( {
            leagueName: evt.target.value,
        } );
    }

    clearInput() {
        this.leagueName.value = "";
    }

    handleClick() {
        const { leagueName, countries } = this.state;
        const id = getId( countries, this.country.getValue() );

        createLeague( {
            name: leagueName,
            countryId: id,
        } ).then( ( ) => this.props.history.push( "/leagues" ) );
    }

    render() {
        const { countries } = this.state;
        const countriesNames = getNames( countries );
        return (
            <div className="league-container">
                <div className="league-logo">
                    <ImageUploader />
                    <button
                        className="button save-button"
                        onClick={ this.handleClick }
                    >
                        Save
                    </button>
                </div>
                <div className="league-details">
                    <input
                        type="text"
                        placeholder="name"
                        className="league-name"
                        onChange={ this.handleChange }
                        ref={ ( ref ) => { this.leagueName = ref; } }
                    />
                    <div className="dropdown-section">
                        <Dropdown
                            elements={ countriesNames }
                            label="country"
                            ref={ ( ref ) => { this.country = ref; } }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter( Leagues );
