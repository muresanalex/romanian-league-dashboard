import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import NotificationCenter from "./notificationCenter.react";
import {
    createCountry,
    getCountry,
    updateCountry,
    deleteCountry,
} from "../../apiService/apiService";

class Countries extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            countryName: "",
            updatePage: false,
            showSpinner: !!props.id,
            image: "",
        };
    }

    componentWillMount() {
        const { id } = this.props;
        if ( id ) {
            getCountry( id ).then( country => {
                this.setState( {
                    country,
                    updatePage: true,
                    countryName: country.name,
                    showSpinner: false,
                    image: country.image,
                } );
            } );
        }
    }

    handleChange = evt => {
        this.setState( {
            countryName: evt.target.value,
        } );
    };

    handleSaveClick = () => {
        const { countryName, updatePage, country } = this.state;
        const image = this.image.getResult();

        if ( updatePage ) {
            updateCountry( { name: countryName, image }, country._id )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        } else {
            createCountry( { name: countryName, image } )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        }
    };

    handleDeleteClick = () => {
        const { id } = this.props;
        if ( id ) {
            deleteCountry( { _id: id } ).then( response => this.handleResponse( response ) );
        }
    };

    handleResponse = response => {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/countries" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    };

    render() {
        const { countryName, showSpinner, image } = this.state;
        const { id } = this.props;
        const saveButtonText = id ? "update" : "save";
        return (
            <div className="country-container">
                <NotificationCenter
                    ref={ ref => {
                        this.notification = ref;
                    } }
                />
                {showSpinner && <div className="lds-dual-ring" />}
                {!showSpinner && (
                    <div>
                        <div className="flag-wrapper">
                            <ImageUploader
                                ref={ ref => {
                                    this.image = ref;
                                } }
                                image={ image }
                            />
                            <button className="button save-button" onClick={ this.handleSaveClick }>
                                {saveButtonText}
                            </button>
                            {id && (
                                <button
                                    className="button delete-button"
                                    onClick={ this.handleDeleteClick }
                                >
                                    delete
                                </button>
                            )}
                        </div>
                        <div className="country-details">
                            <input
                                ref={ name => {
                                    this.name = name;
                                } }
                                type="text"
                                placeholder="name"
                                className="country-name"
                                onChange={ this.handleChange }
                                value={ countryName }
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter( Countries );
