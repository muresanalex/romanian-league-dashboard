import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import {
    getLeagues,
    getCountries,
    createTeam,
    getTeam,
    deleteTeam,
    updateTeam,
} from "../../apiService/apiService";
import { getNames, getId } from "../../helpers/helpers";

class Teams extends Component {
    constructor() {
        super();
        this.state = {
            updatePage: false,
            countries: [],
            leagues: [],
            teamName: "",
            stadium: "",
            countryId: "",
            leagueId: "",
        };
        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleNameChange = this.handleNameChange.bind( this );
        this.handleStadiumChange = this.handleStadiumChange.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
    }

    componentWillMount() {
        const { id } = this.props;

        if ( id ) {
            getTeam( id ).then( ( team ) => this.setState( {
                id,
                updatePage: true,
                teamName: team.name,
                stadium: team.stadium,
                countryId: team.countryId,
                leagueId: team.leagueId,
            } ) );
        }

        getLeagues().then( ( leagues ) => this.setState( { leagues: leagues.data } ) );
        getCountries().then( ( countries ) => this.setState( { countries: countries.data } ) );
    }

    handleNameChange( evt ) {
        this.setState( {
            teamName: evt.target.value,
        } );
    }

    handleStadiumChange( evt ) {
        this.setState( {
            stadium: evt.target.value,
        } );
    }

    clearInputFields() {
        this.name.value = "";
        this.stadium.value = "";
    }

    handleSaveClick() {
        const { teamName, stadium, countries, leagues } = this.state;
        const { id } = this.props;
        const leagueId = getId( leagues, this.league.getValue() );
        const countryId = getId( countries, this.country.getValue() );
        const payload = {
            name: teamName,
            stadium,
            leagueId,
            countryId,
        };

        if ( id ) {
            updateTeam( payload, id ).then( ( ) => this.props.history.push( "/teams" ) );
        } else {
            createTeam( payload ).then( ( ) => this.props.history.push( "/teams" ) );            
        } 
        
    }

    handleDeleteClick() {
        const { id } = this.props;

        if ( id ) {
            deleteTeam( id ).then( () => this.props.history.push( "/teams" ) );
        }
    }

    render() {
        const { countries, leagues, stadium, teamName, leagueId, countryId, updatePage } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        return (
            <div className="team-container">
                <div className="team-logo">
                    <div className="logo-wrapper">
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
                        ref={ ( ref ) => { this.name = ref; } }
                        value={ teamName }
                    />
                    <input
                        type="text"
                        placeholder="stadium"
                        className="team-stadium"
                        onChange={ this.handleStadiumChange }
                        ref={ ( ref ) => { this.stadium = ref; } }
                        value={ stadium }
                    />
                    <div className="dropdown-section">
                        <Dropdown
                            elements={ countries }
                            label="country"
                            ref={ ( ref ) => { this.country = ref; } }
                            value={ countryId }
                        />
                        <Dropdown
                            elements={ leagues }
                            label="league"
                            ref={ ( ref ) => { this.league = ref; } }
                            value={ leagueId }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter( Teams );
