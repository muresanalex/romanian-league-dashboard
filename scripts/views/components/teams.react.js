import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import NotificationCenter from "./notificationCenter.react";
import Pagination from "./pagination.react";
import { getId } from "../../helpers/helpers";
import {
    getLeagues,
    getCountries,
    createTeam,
    getTeam,
    deleteTeam,
    updateTeam,
    removePlayerFromTeam,
    getPlayers,
} from "../../apiService/apiService";

class Teams extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            updatePage: false,
            countries: [],
            leagues: [],
            teamName: "",
            stadium: "",
            coach: "",
            countryId: "",
            leagueId: "",
            showSpinner: !!props.id,
        };
        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleNameChange = this.handleNameChange.bind( this );
        this.handleCoachChange = this.handleCoachChange.bind( this );
        this.handleStadiumChange = this.handleStadiumChange.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.handleResponse = this.handleResponse.bind( this );
    }

    componentWillMount() {
        const { id } = this.props;
        const promises = [ getLeagues(), getCountries() ];

        if ( id ) {
            promises.push( getTeam( id ) );
        }

        Promise.all( promises ).then( ( data ) => {
            const [ leagues, countries, team ] = data;
            let newState = {
                id,
                leagues: leagues.data,
                countries: countries.data,
                showSpinner: false,
            };

            if ( team ) {
                const teamState = {
                    id,
                    updatePage: true,
                    teamName: team.name,
                    stadium: team.stadium,
                    coach: team.coach,
                    countryId: team.countryId,
                    leagueId: team.leagueId,
                };
                newState = Object.assign( {}, newState, teamState );
            }

            this.setState( newState );
        } );
    }

    handleNameChange( evt ) {
        this.setState( {
            teamName: evt.target.value,
        } );
    }

    handleCoachChange( evt ) {
        this.setState( {
            coach: evt.target.value,
        } );
    }

    handleStadiumChange( evt ) {
        this.setState( {
            stadium: evt.target.value,
        } );
    }

    handleSaveClick() {
        const { teamName, stadium, countries, leagues, coach } = this.state;
        const { id } = this.props;
        const leagueId = getId( leagues, this.league.getValue() );
        const countryId = getId( countries, this.country.getValue() );
        const payload = {
            name: teamName,
            stadium,
            coach,
            leagueId,
            countryId,
        };

        if ( id ) {
            updateTeam( payload, id )
                .then( ( res ) => res.json() )
                .then( ( response ) => this.handleResponse( response ) );
        } else {
            createTeam( payload )
                .then( ( res ) => res.json() )
                .then( ( response ) => this.handleResponse( response ) );
        }
    }

    handleDeleteClick() {
        const { id } = this.props;

        if ( id ) {
            deleteTeam( { _id: id } )
                .then( ( response ) => this.handleResponse( response ) );
        }
    }

    handleResponse( response ) {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/teams" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    }

    render() {
        const {
            countries,
            leagues,
            stadium,
            coach,
            teamName,
            leagueId,
            countryId,
            updatePage,
            showSpinner,
        } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        return (
            <div className="team-container">
                <NotificationCenter ref={ ( ref ) => {
                    this.notification = ref;
                } }
                />
                { showSpinner && <div className="lds-dual-ring" /> }
                { !showSpinner && (
                    <div className="team-wrapper">
                        <div className="team-details-wrapper">
                            <div className="team-logo">
                                <div className="logo-wrapper clearfix">
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
                            </div>
                            <div className="team-details">
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="team-name"
                                    onChange={ this.handleNameChange }
                                    ref={ ( ref ) => {
                                        this.name = ref;
                                    } }
                                    value={ teamName }
                                />
                                <input
                                    type="text"
                                    placeholder="stadium"
                                    className="team-stadium"
                                    onChange={ this.handleStadiumChange }
                                    ref={ ( ref ) => {
                                        this.stadium = ref;
                                    } }
                                    value={ stadium }
                                />
                                <input
                                    type="text"
                                    placeholder="coach"
                                    className="team-coach"
                                    onChange={ this.handleCoachChange }
                                    ref={ ( ref ) => {
                                        this.coach = ref;
                                    } }
                                    value={ coach }
                                />
                                <div className="dropdown-section clearfix">
                                    <Dropdown
                                        elements={ countries }
                                        label="country"
                                        ref={ ( ref ) => {
                                            this.country = ref;
                                        } }
                                        value={ countryId }
                                    />
                                    <Dropdown
                                        elements={ leagues }
                                        label="league"
                                        ref={ ( ref ) => {
                                            this.league = ref;
                                        } }
                                        value={ leagueId }
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            this.props.id && (
                                <Pagination
                                    getResults={ getPlayers }
                                    deleteItem={ removePlayerFromTeam }
                                    path="/players"
                                    filterBy="teamId"
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

export default withRouter( Teams );
