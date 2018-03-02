import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import StatsInput from "./statsInput.react";
import Dictionary from "../../helpers/dictionary";
import { getNames } from "../../helpers/helpers";
import { getCountries, getTeams } from "../../apiService/apiService";

class Players extends Component {
    constructor() {
        super();
        this.state = {
            attackingStats: [ "crossing", "finishing", "headingAcc", "shortPassing", "volleys" ],
            skillStats: [ "dribbling", "curve", "fkAccuracy", "longPassing", "ballControl" ],
            movementStats: [ "acceleration", "sprintSpeed", "agility", "reactions", "balance" ],
            powerStats: [ "shotPower", "jumping", "stamina", "strength", "longShots" ],
            mentalityStats: [ "aggression", "interceptions", "positioning", "vision", "penalties", "composure" ],
            defendingStats: [ "marking", "standingTackle", "slidingTackle" ],
            goalkeepingStats: [ "gkDiving", "gkHandling", "gkKicking", "gkPositioning", "gkReflexes" ],
            teams: [],
            countries: [],
            playerDetails: {},
        };

        this.handleClick = this.handleClick.bind( this );
    }

    componentDidMount() {
        getTeams().then( ( teams ) => this.setState( { teams } ) );
        getCountries().then( ( countries ) => this.setState( { countries } ) );
    }

    handleClick() {
        const {
            attackingStats,
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
            playerDetails,
        } = this.state;
        const stats = {};
        attackingStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        skillStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        movementStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        powerStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        mentalityStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        defendingStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        goalkeepingStats.forEach( ( item ) => {
            if ( this[ item ] ) {
                stats[ item ] = this[ item ].getValue();
            }
        } );

        this.setState( {
            playerDetails: Object.assign( {}, playerDetails, stats ),
        } );
    }

    handleInputChange( item ) {
        return ( evt ) => {
            const details = {};
            details[ item ] = evt.target.value;
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
        } = this.state;

        const teamsNames = getNames( teams );
        const countriesNames = getNames( countries );
        console.log( this.state.playerDetails );
        return (
            <div className="player-container grid-container">
                <div className="details col-2">
                    <ImageUploader />
                    <input
                        type="text"
                        placeholder="first name"
                        className="player-name"
                        onChange={ this.handleInputChange( "firstName" ) }
                    />
                    <input
                        type="text"
                        placeholder="last name"
                        className="player-name"
                        onChange={ this.handleInputChange( "lastName" ) }
                    />
                    <input
                        type="date"
                        className="birth-date"
                        onChange={ this.handleInputChange( "dateOfBirth" ) }
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
                            />
                            <span className="measure-unit">kg</span>
                        </div>
                    </div>

                    <div className="dropdown-section">
                        <Dropdown ref={ ( ref ) => { this.countryId = ref; } } elements={ countriesNames } label="country" />
                        <Dropdown ref={ ( ref ) => { this.teamId = ref; } } elements={ teamsNames } label="team" />
                        <input
                            type="number"
                            placeholder="nr"
                            min="1"
                            max="99"
                            className="shirt-number"
                            onChange={ this.handleInputChange( "jerseyNumber" ) }
                        />
                        <span className="shirt-label">number</span>
                        <Dropdown ref={ ( ref ) => { this.position = ref; } } elements={ Dictionary.positions } label="position" />
                        <Dropdown ref={ ( ref ) => { this.preferredFoot = ref; } } elements={ Dictionary.preferredFoot } label="foot" />
                        <Dropdown ref={ ( ref ) => { this.weakFoot = ref; } } elements={ Dictionary.stars } label="weak foot" />
                    </div>
                    <button className="save-button" onClick={ this.handleClick } >Save</button>
                </div>
                <div className="stats col-4">
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Attacking</span>
                            { attackingStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Skill</span>
                            { skillStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Movement</span>
                            { movementStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Power</span>
                            { powerStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Mentality</span>
                            { mentalityStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Defending</span>
                            { defendingStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Goalkeeping</span>
                            { goalkeepingStats.map( ( item ) => <StatsInput ref={ ( ref ) => { this[ item ] = ref; } } key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Special</span>
                            <StatsInput ref={ ( ref ) => { this.potential = ref; } } name="potential" />
                            <Dropdown ref={ ( ref ) => { this.internationalReputation = ref; } } elements={ Dictionary.stars } label="reputation" />
                            <Dropdown ref={ ( ref ) => { this.skillMoves = ref; } } elements={ Dictionary.stars } label="skill moves" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Players;
