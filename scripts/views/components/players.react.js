import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import StatsInput from "./statsInput.react";
import Dictionary from "../../helpers/dictionary";
import { getNames, getId } from "../../helpers/helpers";
import { getCountries, getTeams, createPlayer, getPlayer, deletePlayer, updatePlayer } from "../../apiService/apiService";

class Players extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            attackingStats: [ "crossing", "finishing", "headingAcc", "shortPassing", "volleys" ],
            skillStats: [ "dribbling", "curve", "fkAccuracy", "longPassing", "ballControl" ],
            movementStats: [ "acceleration", "sprintSpeed", "agility", "reactions", "balance" ],
            powerStats: [ "shotPower", "jumping", "stamina", "strength", "longShots" ],
            mentalityStats: [ "aggression", "interceptions", "positioning", "vision", "penalties", "composure" ],
            defendingStats: [ "marking", "standingTackle", "slidingTackle" ],
            goalkeepingStats: [ "gkDiving", "gkHandling", "gkKicking", "gkPositioning", "gkReflexes" ],
            otherStats: [ "countryId", "teamId", "position", "preferredFoot", "weakFoot", "potential", "internationalReputation", "skillMoves" ],
            teams: [],
            countries: [],
            playerDetails: {},
            showSpinner: props.id ? true : false,
        };

        this.handleSaveClick = this.handleSaveClick.bind( this );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.getValues = this.getValues.bind( this );
    }

    componentWillMount() {
        const { id } = this.props;
        const promises = [ getTeams(), getCountries() ];
        
        if ( id ) {
            promises.push( getPlayer( id ) );
        }
        
        Promise.all( promises ).then( ( data ) => {
            const [ teams, countries, player ] = data;
            console.log('data: ', data);
            let newState = {
                teams: teams.data,
                countries: countries.data,
                showSpinner: false,
            };

            if ( player ) {
                const playerState = {
                    id,
                    updatePage: true,
                    playerDetails: player,
                }

                newState = Object.assign( {}, newState, playerState );
            }

            this.setState( newState );
        } )
    }

    getValues( statsArray ) {
        const { teams, countries } = this.state;
        const accumulator = {};
        statsArray.forEach( ( item ) => {
            if ( this[ item ] ) {
                const value = this[ item ].getValue();

                if ( item === "teamId" ) {
                    accumulator[ item ] = getId( teams, value );
                } else if ( item === "countryId" ) {
                    accumulator[ item ] = getId( countries, value );
                } else {
                    accumulator[ item ] = value;
                }
            }
        } );
        return accumulator;
    }

    handleSaveClick() {
        const {
            attackingStats,
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
            otherStats,
            playerDetails,
        } = this.state;
        const { id } = this.props;

        const attackingStatsValues = this.getValues( attackingStats );
        const skillStatsValues = this.getValues( skillStats );
        const movementStatsValues = this.getValues( movementStats );
        const powerStatsValues = this.getValues( powerStats );
        const mentalityStatsValues = this.getValues( mentalityStats );
        const defendingStatsValues = this.getValues( defendingStats );
        const goalkeepingStatsValues = this.getValues( goalkeepingStats );
        const otherStatsValues = this.getValues( otherStats );

        const fullDetails = Object.assign( {}, playerDetails, attackingStatsValues, skillStatsValues, movementStatsValues, powerStatsValues, mentalityStatsValues, defendingStatsValues, goalkeepingStatsValues, otherStatsValues );
        if ( id ) {
            delete fullDetails._id;
            updatePlayer( fullDetails, id ).then( () => this.props.history.push( "/players" ) );
        } else {
            createPlayer( fullDetails ).then( () => this.props.history.push( "/players" ) );
        }
    }

    handleDeleteClick() {
        const { id } = this.props;
        deletePlayer( id ).then( () => this.props.history.push( "/players" ) );
    }

    handleInputChange( item ) {
        return ( evt ) => {
            const details = {};
            const { value } = evt.target;
            details[ item ] = isNaN( value ) ? value : parseInt( value, 10 );
            this.setState( {
                playerDetails: Object.assign( {}, this.state.playerDetails, details ),
            } );
        };
    }

    render() {
        const {
            attackingStats,
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
            teams,
            countries,
            playerDetails,
            updatePage,
            showSpinner,
        } = this.state;
        const saveButtonText = updatePage ? "update" : "save";
        
        return (
            <div className="player-container grid-container">
                { showSpinner && <div className="lds-dual-ring" /> }
                { !showSpinner && (
                    <div>
                        <div className="details col-2">
                            <ImageUploader />
                            <input
                                type="text"
                                placeholder="first name"
                                className="player-name"
                                onChange={ this.handleInputChange( "firstName" ) }
                                value={ playerDetails.firstName || "" }
                            />
                            <input
                                type="text"
                                placeholder="last name"
                                className="player-name"
                                onChange={ this.handleInputChange( "lastName" ) }
                                value={ playerDetails.lastName || "" }
                            />
                            <input
                                type="date"
                                className="birth-date"
                                onChange={ this.handleInputChange( "dateOfBirth" ) }
                                value={ playerDetails.dateOfBirth || "" }
                            />
                            <div className="row">
                                <div className="col-2">
                                    <input
                                        type="number"
                                        placeholder="height"
                                        min="150"
                                        max="220"
                                        className="player-height"
                                        onChange={ this.handleInputChange( "height" ) }
                                        value={ playerDetails.height || "" }
                                    />
                                    <span className="measure-unit">cm</span>
                                </div>
                                <div className="col-2">
                                    <input
                                        type="number"
                                        placeholder="weight"
                                        min="50"
                                        max="130"
                                        className="player-weight"
                                        onChange={ this.handleInputChange( "weight" ) }
                                        value={ playerDetails.weight || "" }
                                    />
                                    <span className="measure-unit">kg</span>
                                </div>
                            </div>

                            <div className="dropdown-section">
                                <Dropdown value={ playerDetails.countryId } ref={ ( ref ) => { this.countryId = ref; } } elements={ countries } label="country" />
                                <Dropdown value={ playerDetails.teamId } ref={ ( ref ) => { this.teamId = ref; } } elements={ teams } label="team" />
                                <input
                                    type="number"
                                    placeholder="nr"
                                    min="1"
                                    max="99"
                                    className="shirt-number"
                                    onChange={ this.handleInputChange( "jerseyNumber" ) }
                                    value={ playerDetails.jerseyNumber || "" }
                                />
                                <span className="shirt-label">number</span>
                                <Dropdown value={ playerDetails.position } ref={ ( ref ) => { this.position = ref; } } elements={ Dictionary.positions } label="position" />
                                <Dropdown value={ playerDetails.preferredFoot } ref={ ( ref ) => { this.preferredFoot = ref; } } elements={ Dictionary.preferredFoot } label="foot" />
                                <Dropdown value={ playerDetails.weakFoot } ref={ ( ref ) => { this.weakFoot = ref; } } elements={ Dictionary.stars } label="weak foot" />
                            </div>
                            <button className="button save-button" onClick={ this.handleSaveClick } >{ saveButtonText }</button>
                            { updatePage && (
                                <button className="button delete-button" onClick={ this.handleDeleteClick } >delete</button>                        
                            ) }
                        </div>
                        <div className="stats col-4">
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Attacking</span>
                                    { attackingStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Skill</span>
                                    { skillStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Movement</span>
                                    { movementStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Power</span>
                                    { powerStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Mentality</span>
                                    { mentalityStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Defending</span>
                                    { defendingStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Goalkeeping</span>
                                    { goalkeepingStats.map( ( item ) => <StatsInput value={ playerDetails } ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Special</span>
                                    <StatsInput value={ playerDetails } ref={ ( ref ) => { this.potential = ref; } } name="potential" />
                                    <Dropdown value={ playerDetails.internationalReputation } ref={ ( ref ) => { this.internationalReputation = ref; } } elements={ Dictionary.stars } label="reputation" />
                                    <Dropdown value={ playerDetails.skillMoves } ref={ ( ref ) => { this.skillMoves = ref; } } elements={ Dictionary.stars } label="skill moves" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
        );
    }
}

export default withRouter( Players );
