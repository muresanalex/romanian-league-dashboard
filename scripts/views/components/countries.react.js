import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import { createCountry } from "../../apiService/apiService";

class Countries extends Component {
    constructor() {
        super();
        this.state = {
            countryName: "",
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleClick = this.handleClick.bind( this );
    }

    handleChange( evt ) {
        this.setState( {
            countryName: evt.target.value,
        } );
    }

    clearInput() {
        this.name.value = "";
    }

    handleClick() {
        const { countryName } = this.state;
        createCountry( { name: countryName } );
        this.clearInput();
    }

    render() {
        return (
            <div className="country-container">
                <div className="flag-wrapper">
                    <ImageUploader />
                    <button
                        className="button save-button"
                        onClick={ this.handleClick }
                    >
                        Save
                    </button>
                </div>
                <div className="country-details">
                    <input
                        ref={ ( name ) => { this.name = name; } }
                        type="text"
                        placeholder="name"
                        className="country-name"
                        onChange={ this.handleChange }
                    />
                </div>
            </div>
        );
    }
}

export default Countries;
