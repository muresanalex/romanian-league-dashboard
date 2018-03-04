import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import { createCountry, getCountry, updateCountry, deleteCountry } from "../../apiService/apiService";

class Countries extends Component {
    constructor() {
        super();
        this.state = {
            countryName: "",
            updatePage: false,
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );        
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

    handleSaveClick() {
        const { countryName, updatePage, country } = this.state;

        if ( updatePage ) {
            updateCountry( { name: countryName }, country._id ).then( () => this.props.history.push( "/countries" ) );
        } else {
            createCountry( { name: countryName } ).then( () => this.props.history.push( "/countries" ) );
        }
    }

    handleDeleteClick() {
        const { id } = this.props;
        if ( id ) {
            deleteCountry( id ).then( ( ) => this.props.history.push( "/countries" ) );
        }
        
    }

    render() {
        const { countryName } = this.state;
        const { id } = this.props;
        const saveButtonText = id ? "update" : "save";
        return (
            <div className="country-container">
                <div className="flag-wrapper">
                    <ImageUploader />
                    <button
                        className="button save-button"
                        onClick={ this.handleSaveClick }
                    >
                        { saveButtonText }
                    </button>
                    {
                        id && ( <button
                        className="button delete-button"
                        onClick={ this.handleDeleteClick }
                    >
                        delete
                        </button> )
                    }
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
