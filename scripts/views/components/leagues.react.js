import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import { getCountries, createLeague } from "../../apiService/apiService";

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
            .then( ( countries ) => this.setState( { countries } ) );
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
        const id = getId( countries, this.country.getSelectedValue() );
        console.log( {
            name: leagueName,
            countryId: id,
        } );
        createLeague( {
            name: leagueName,
            countryId: id,
        } );
        this.clearInput();
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

function getNames( array ) {
    return array.map( ( item ) => item.name );
}

function getId( array, name ) {
    const newArray = array.filter( ( item ) => item.name === name );
    return newArray[ 0 ]._id;
}

export default Leagues;
