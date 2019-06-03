import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import NotificationCenter from "./notificationCenter.react";
import ColorPicker from "./colorPicker.react";
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
    getTeams,
} from "../../apiService/apiService";
import FirstEleven from "./firstEleven.react";

class Teams extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            updatePage: false,
            countries: [],
            leagues: [],
            teams: [],
            id: "",
            teamName: "",
            stadium: "",
            coach: "",
            countryId: "",
            leagueId: "",
            rivalTeamId: "",
            image: "",
            formation: "",
            firstEleven: {},
            firstColor: "#ffffff",
            secondColor: "#ffffff",
            showSpinner: !!props.id,
        };
    }

    componentWillMount() {
        const { id } = this.props;
        const promises = [ getLeagues(), getCountries(), getTeams() ];

        if ( id ) {
            promises.push( getTeam( id ) );
        }

        Promise.all( promises ).then( data => {
            const [ leagues, countries, teams, team ] = data;
            let newState = {
                id,
                leagues: leagues.data,
                countries: countries.data,
                teams: teams.data,
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
                    rivalTeamId: team.rivalTeamId,
                    image: team.image,
                    firstColor: team.firstColor,
                    secondColor: team.secondColor,
                    formation: team.formation,
                    firstEleven: team.firstEleven,
                };
                newState = Object.assign( {}, newState, teamState );
            }

            this.setState( newState );
        } );
    }

    handleNameChange = evt => {
        this.setState( {
            teamName: evt.target.value,
        } );
    };

    handleCoachChange = evt => {
        this.setState( {
            coach: evt.target.value,
        } );
    };

    handleStadiumChange = evt => {
        this.setState( {
            stadium: evt.target.value,
        } );
    };

    handleColorChange = color => evt => {
        const { value } = evt.target;
        if ( color === "firstColor" ) {
            this.setState( {
                firstColor: value,
            } );
        } else {
            this.setState( {
                secondColor: value,
            } );
        }
    };

    handleSaveClick = () => {
        const { teamName, stadium, countries, leagues, teams, coach } = this.state;
        const { id } = this.props;
        const leagueId = getId( leagues, this.league.getValue() );
        const countryId = getId( countries, this.country.getValue() );
        const rivalTeamId = getId( teams, this.rivalTeam.getValue() );
        const firstColor = this.firstColor.getValue();
        const secondColor = this.secondColor.getValue();
        const image = this.image.getResult();
        const formation = this.firstEleven.getSelectedFormation();
        const selectedPlayers = this.firstEleven.getSelectedPlayers();
        const payload = {
            name: teamName,
            stadium,
            coach,
            leagueId,
            countryId,
            rivalTeamId,
            image,
            firstColor,
            secondColor,
            formation: formation._id,
            firstEleven: selectedPlayers,
        };

        if ( id ) {
            updateTeam( payload, id )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        } else {
            createTeam( payload )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        }
    };

    handleDeleteClick = () => {
        const { id } = this.props;

        if ( id ) {
            deleteTeam( { _id: id } ).then( response => this.handleResponse( response ) );
        }
    };

    handleResponse = response => {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/teams" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    };

    render() {
        const {
            id,
            countries,
            leagues,
            stadium,
            teams,
            coach,
            teamName,
            leagueId,
            countryId,
            rivalTeamId,
            updatePage,
            showSpinner,
            image,
            formation,
            firstEleven,
        } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        const otherTeams = teams.filter( team => team._id !== id );
        return (
            <div className="team-container">
                <NotificationCenter
                    ref={ ref => {
                        this.notification = ref;
                    } }
                />
                {showSpinner && <div className="lds-dual-ring" />}
                {!showSpinner && (
                    <div className="team-wrapper">
                        <div className="team-details-wrapper">
                            <div className="team-logo">
                                <div className="logo-wrapper clearfix">
                                    <ImageUploader
                                        ref={ ref => {
                                            this.image = ref;
                                        } }
                                        image={ image }
                                    />
                                    <button
                                        className="button save-button"
                                        onClick={ this.handleSaveClick }
                                    >
                                        {saveButtonText}
                                    </button>
                                    {updatePage && (
                                        <button
                                            className="button delete-button"
                                            onClick={ this.handleDeleteClick }
                                        >
                                            delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="team-details">
                                <input
                                    type="text"
                                    placeholder="name"
                                    className="team-name"
                                    onChange={ this.handleNameChange }
                                    ref={ ref => {
                                        this.name = ref;
                                    } }
                                    value={ teamName }
                                />
                                <input
                                    type="text"
                                    placeholder="stadium"
                                    className="team-stadium"
                                    onChange={ this.handleStadiumChange }
                                    ref={ ref => {
                                        this.stadium = ref;
                                    } }
                                    value={ stadium }
                                />
                                <input
                                    type="text"
                                    placeholder="coach"
                                    className="team-coach"
                                    onChange={ this.handleCoachChange }
                                    ref={ ref => {
                                        this.coach = ref;
                                    } }
                                    value={ coach }
                                />
                                <div className="dropdown-section clearfix">
                                    <Dropdown
                                        elements={ countries }
                                        label="country"
                                        ref={ ref => {
                                            this.country = ref;
                                        } }
                                        value={ countryId }
                                    />
                                    <Dropdown
                                        elements={ leagues }
                                        label="league"
                                        ref={ ref => {
                                            this.league = ref;
                                        } }
                                        value={ leagueId }
                                    />
                                    <Dropdown
                                        elements={ otherTeams }
                                        label="rival team"
                                        ref={ ref => {
                                            this.rivalTeam = ref;
                                        } }
                                        value={ rivalTeamId }
                                    />
                                    <ColorPicker
                                        ref={ ref => {
                                            this.firstColor = ref;
                                        } }
                                        handleColorChange={ this.handleColorChange( "firstColor" ) }
                                        value={ this.state.firstColor }
                                    />
                                    <ColorPicker
                                        ref={ ref => {
                                            this.secondColor = ref;
                                        } }
                                        handleColorChange={ this.handleColorChange( "secondColor" ) }
                                        value={ this.state.secondColor }
                                    />
                                </div>
                            </div>
                            <FirstEleven
                                ref={ ref => {
                                    this.firstEleven = ref;
                                } }
                                getPlayers={ getPlayers }
                                formation={ formation }
                                firstEleven={ firstEleven }
                                id={ this.props.id }
                            />
                        </div>
                        {this.props.id && (
                            <Pagination
                                getResults={ getPlayers }
                                deleteItem={ removePlayerFromTeam }
                                path="/players"
                                filterBy="teamId"
                                id={ this.props.id }
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter( Teams );
