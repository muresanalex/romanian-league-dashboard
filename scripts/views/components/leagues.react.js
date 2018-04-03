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
    getTeams,
    removeTeamFromLeague,
} from "../../apiService/apiService";
import { getId } from "../../helpers/helpers";
import NotificationCenter from "./notificationCenter.react";
import Pagination from "./pagination.react";

class Leagues extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            leagueName: "",
            countries: [],
            updatePage: false,
            countryId: "",
            image: "",
            showSpinner: !!props.id,
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.handleResponse = this.handleResponse.bind( this );
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
                    image: league.image,
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
        const image = this.image.getResult();
        const payload = {
            name: leagueName,
            countryId,
            image,
        };

        if ( updatePage ) {
            updateLeague( payload, id )
                .then( ( res ) => res.json() )
                .then( ( response ) => this.handleResponse( response ) );
        } else {
            createLeague( payload )
                .then( ( res ) => res.json() )
                .then( ( response ) => this.handleResponse( response ) );
        }
    }

    handleDeleteClick() {
        const { id } = this.props;
        if ( id ) {
            deleteLeague( { _id: id } )
                .then( ( response ) => this.handleResponse( response ) );
        }
    }

    handleResponse( response ) {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/leagues" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    }

    render() {
        const { countries, updatePage, leagueName, countryId, showSpinner, image } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        return (
            <div className="league-container">
                <NotificationCenter ref={ ( ref ) => {
                    this.notification = ref;
                } }
                />
                { showSpinner && <div className="lds-dual-ring" /> }
                { !showSpinner && (
                    <div className="league-wrapper">
                        <div className="league-details-wrapper">
                            <div className="league-logo">
                                <ImageUploader
                                    ref={ ( ref ) => {
                                        this.image = ref;
                                    } }
                                    image={ image }
                                />
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
                                    ref={ ( ref ) => {
                                        this.leagueName = ref;
                                    } }
                                    value={ leagueName }
                                />
                                <div className="dropdown-section">
                                    <Dropdown
                                        elements={ countries }
                                        label="country"
                                        ref={ ( ref ) => {
                                            this.country = ref;
                                        } }
                                        value={ countryId }
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            this.props.id && (
                                <Pagination
                                    getResults={ getTeams }
                                    deleteItem={ removeTeamFromLeague }
                                    path="/teams"
                                    filterBy="leagueId"
                                    id={ this.props.id }
                                />
                            )
                        }
                    </div>
                ) }
            </div>
        );
    }
}

export default withRouter( Leagues );
