import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import {
    getCountries,
    createLeague,
    deleteLeague,
    getLeague,
    updateLeague,
} from "../../apiService/apiService";
import { getId, getNames } from "../../helpers/helpers";

class Leagues extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            leagueName: "",
            countries: [],
            updatePage: false,
            countryId: "",
            showSpinner: props.id ? true : false,            
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
    }

    componentWillMount() {
        const { id } = this.props;
        const promises = [ getCountries() ];
        
        if ( id ) {
            promises.push( getLeague( id ) );
        }

        Promise.all( promises ).then( ( data ) => {
            const [ countries, league ] = data;
            let newState = {
                countries: countries.data,
                showSpinner: false,                
            };

            if ( league ) {
                const leagueState = {
                    id,
                    updatePage: true,
                    leagueName: league.name,
                    countryId: league.countryId,
                };
                
                newState = Object.assign( {}, newState, leagueState );
            }

            this.setState( newState );
        } );
    }

    handleChange( evt ) {
        this.setState( {
            leagueName: evt.target.value,
        } );
    }

    handleSaveClick() {
        const { leagueName, countries, updatePage } = this.state;
        const { id } = this.props;
        const countryId = getId( countries, this.country.getValue() );
        const payload = {
            name: leagueName,
            countryId: countryId,
        };

        if ( updatePage ) {
            updateLeague( payload, id ).then( ( ) => this.props.history.push( "/leagues" ) );
        } else {
            createLeague( payload ).then( ( ) => this.props.history.push( "/leagues" ) );
        }

    }

    handleDeleteClick() {
        const { id } = this.props;
        if ( id ) {
            deleteLeague( id ).then( ( ) => this.props.history.push( "/leagues" ) );
        }
        
    }

    render() {
        const { countries, updatePage, leagueName, countryId, showSpinner } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        return (
            <div className="league-container">
                { showSpinner && <div className="lds-dual-ring" /> }
                { !showSpinner && (
                    <div>
                        <div className="league-logo">
                            <ImageUploader />
                            <button
                                className="button save-button"
                                onClick={ this.handleSaveClick }
                            >
                                { saveButtonText }
                            </button>
                            {
                                updatePage && (
                                    <button
                                        className="button delete-button"
                                        onClick={ this.handleDeleteClick }
                                    >
                                        delete
                                    </button>
                                )
                            }
                        </div>
                        <div className="league-details">
                            <input
                                type="text"
                                placeholder="name"
                                className="league-name"
                                onChange={ this.handleChange }
                                ref={ ( ref ) => { this.leagueName = ref; } }
                                value={ leagueName }
                            />
                            <div className="dropdown-section">
                                <Dropdown
                                    elements={ countries }
                                    label="country"
                                    ref={ ( ref ) => { this.country = ref; } }
                                    value={ countryId }
                                />
                            </div>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default withRouter( Leagues );
