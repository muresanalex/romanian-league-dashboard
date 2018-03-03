import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import { createCountry, getCountry, updateCountry } from "../../apiService/apiService";

class Countries extends Component {
    constructor() {
        super();
        this.state = {
            countryName: "",
            updatePage: false,
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleClick = this.handleClick.bind( this );
    }

    componentWillMount() {
        const { id } = this.props;
        if ( id ) {
            getCountry( id ).then( ( country ) => {
                this.setState( {
                    country,
                    updatePage: true,
                    countryName: country.name,
                } );
            } );
        }
    }

    handleChange( evt ) {
        this.setState( {
            countryName: evt.target.value,
        } );
    }

    handleClick() {
        const { countryName, updatePage, country } = this.state;

        if ( updatePage ) {
            updateCountry( { name: countryName }, country._id ).then( () => this.props.history.push( "/countries" ) );
        } else {
            createCountry( { name: countryName } ).then( () => this.props.history.push( "/countries" ) );
        }
    }

    render() {
        const { countryName } = this.state;
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
                        value={ countryName }
                    />
                </div>
            </div>
        );
    }
}

export default withRouter( Countries );
