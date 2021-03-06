import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import StatsInput from "./statsInput.react";
import NotificationCenter from "./notificationCenter.react";
import ImportStats from "./importStats.react";
import Dictionary from "../../helpers/dictionary";
import Overall from "./overall.react";
import computeOverallValue from "../../helpers/computeOverallValue";
import { getId } from "../../helpers/helpers";
import {
    getCountries,
    getTeams,
    createPlayer,
    getPlayer,
    deletePlayer,
    updatePlayer,
} from "../../apiService/apiService";
import {
    defaultPlayerDetails,
    defaultAttackingStats,
    defaultSkillStats,
    defaultMovementStats,
    defaultPowerStats,
    defaultMentalityStats,
    defaultDefendingStats,
    defaultGoalkeepingStats,
    defaultOtherStats,
} from "../../enums/player";

class Players extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            attackingStats: defaultAttackingStats,
            skillStats: defaultSkillStats,
            movementStats: defaultMovementStats,
            powerStats: defaultPowerStats,
            mentalityStats: defaultMentalityStats,
            defendingStats: defaultDefendingStats,
            goalkeepingStats: defaultGoalkeepingStats,
            otherStats: defaultOtherStats,
            teams: [],
            countries: [],
            playerDetails: defaultPlayerDetails,
            showSpinner: !!props.id,
        };
    }

    componentWillMount() {
        const { id } = this.props;
        const promises = [ getTeams(), getCountries() ];

        if ( id ) {
            promises.push( getPlayer( id ) );
        }

        Promise.all( promises ).then( data => {
            const [ teams, countries, player ] = data;
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
                };
                newState = Object.assign( {}, newState, playerState );
            }
            this.setState( newState );
        } );
    }

    getValues = statsArray => {
        const { teams, countries } = this.state;
        const accumulator = {};
        statsArray.forEach( item => {
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
    };

    getFullDetails = () => {
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

        const stats = attackingStats.concat(
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
            otherStats,
        );
        const values = this.getValues( stats );
        values.image = this.image.getResult();

        return Object.assign( {}, playerDetails, values );
    };

    setPlayerStats = stats => {
        const statsKeys = Object.keys( stats );
        statsKeys.forEach( key => this.handleStatChange( key, stats[ key ] ) );
    };

    handleSaveClick = () => {
        const { id } = this.props;

        const fullDetails = this.getFullDetails();

        if ( id ) {
            delete fullDetails._id;
            updatePlayer( fullDetails, id )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        } else {
            createPlayer( fullDetails )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        }
    };

    handleDeleteClick = () => {
        const { id } = this.props;
        deletePlayer( { _id: id } ).then( response => this.handleResponse( response ) );
    };

    handleInputChange = item => evt => {
        const details = {};
        const { value } = evt.target;
        details[ item ] = isNaN( value ) ? value : parseInt( value, 10 );
        if ( item === "firstName" ) {
            details.fullName = `${ details.firstName } ${ this.state.playerDetails.lastName }`;
        } else if ( item === "lastName" ) {
            details.fullName = `${ this.state.playerDetails.firstName } ${ details.lastName }`;
        }
        this.setState( {
            playerDetails: Object.assign( {}, this.state.playerDetails, details ),
        } );
    };

    handleResponse = response => {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/players" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    };

    handleStatChange = ( stat, value ) => {
        const { playerDetails } = this.state;
        const newValue = {};
        newValue[ stat ] = value;
        const updatedDetails = Object.assign( {}, playerDetails, newValue );
        const overall = computeOverallValue( updatedDetails );

        if ( playerDetails.ovarall !== overall ) {
            newValue.overall = overall;
        }

        this.setState( {
            playerDetails: Object.assign( {}, updatedDetails, newValue ),
        } );
    };

    plusOne = () => {
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

        const stats = attackingStats.concat(
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
        );

        const newValues = {};

        stats.forEach( stat => {
            this[ stat ].plusOne();
            newValues[ stat ] = playerDetails[ stat ] + 1 > 99 ? 99 : playerDetails[ stat ] + 1;
        } );

        const updatedDetails = Object.assign( {}, playerDetails, newValues );
        const overall = computeOverallValue( updatedDetails );

        if ( updatedDetails.ovarall !== overall ) {
            newValues.overall = overall;
        }

        this.setState( {
            playerDetails: Object.assign( {}, updatedDetails, newValues ),
        } );
    };

    minusOne = () => {
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

        const stats = attackingStats.concat(
            skillStats,
            movementStats,
            powerStats,
            mentalityStats,
            defendingStats,
            goalkeepingStats,
        );

        const newValues = {};

        stats.forEach( stat => {
            this[ stat ].minusOne();
            newValues[ stat ] = playerDetails[ stat ] - 1 < 1 ? 1 : playerDetails[ stat ] - 1;
        } );

        const updatedDetails = Object.assign( {}, playerDetails, newValues );
        const overall = computeOverallValue( updatedDetails );

        if ( updatedDetails.ovarall !== overall ) {
            newValues.overall = overall;
        }

        this.setState( {
            playerDetails: Object.assign( {}, updatedDetails, newValues ),
        } );
    };

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
                <NotificationCenter
                    ref={ ref => {
                        this.notification = ref;
                    } }
                />
                {showSpinner && <div className="lds-dual-ring" />}
                {!showSpinner && (
                    <div>
                        <div className="details col-2">
                            <div className="top-group clearfix">
                                <ImageUploader
                                    ref={ ref => {
                                        this.image = ref;
                                    } }
                                    image={ playerDetails.image }
                                />
                                <div className="top-right">
                                    <Overall renderValue={ playerDetails.overall } />
                                    <button className="plus-button" onClick={ this.plusOne }>
                                        +1
                                    </button>
                                    <button className="minus-button" onClick={ this.minusOne }>
                                        -1
                                    </button>
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
                                </div>
                            </div>
                            <div className="height-and-weight">
                                <div className="input-wrapper">
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
                                </div>
                                <div className="input-wrapper">
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
                                <div className="input-wrapper">
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
                            <div className="country-and-team clearfix">
                                <input
                                    type="date"
                                    className="birth-date"
                                    onChange={ this.handleInputChange( "dateOfBirth" ) }
                                    value={ playerDetails.dateOfBirth || "" }
                                />
                                <Dropdown
                                    value={ playerDetails.countryId }
                                    ref={ ref => {
                                        this.countryId = ref;
                                    } }
                                    elements={ countries }
                                    label="country"
                                />
                                <Dropdown
                                    value={ playerDetails.teamId }
                                    ref={ ref => {
                                        this.teamId = ref;
                                    } }
                                    elements={ teams }
                                    label="team"
                                />
                            </div>
                            <div className="position-and-foot clearfix">
                                <Dropdown
                                    value={ playerDetails.position }
                                    ref={ ref => {
                                        this.position = ref;
                                    } }
                                    elements={ Dictionary.positions }
                                    label="position"
                                    handleStatChange={ this.handleStatChange }
                                    small
                                />
                                <Dropdown
                                    value={ playerDetails.preferredFoot }
                                    ref={ ref => {
                                        this.preferredFoot = ref;
                                    } }
                                    elements={ Dictionary.preferredFoot }
                                    label="foot"
                                    small
                                />
                                <Dropdown
                                    value={ playerDetails.weakFoot }
                                    ref={ ref => {
                                        this.weakFoot = ref;
                                    } }
                                    elements={ Dictionary.stars }
                                    label="weak foot"
                                    small
                                />
                            </div>
                            <div className="buttons-section">
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
                                <ImportStats setPlayerStats={ this.setPlayerStats } />
                            </div>
                        </div>
                        <div className="stats col-4">
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Attacking</span>
                                    {attackingStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Skill</span>
                                    {skillStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Movement</span>
                                    {movementStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Power</span>
                                    {powerStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Mentality</span>
                                    {mentalityStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Defending</span>
                                    {defendingStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="stats-group col-3">
                                    <span className="title">Goalkeeping</span>
                                    {goalkeepingStats.map( item => (
                                        <StatsInput
                                            value={ playerDetails }
                                            ref={ ref => {
                                                this[ item ] = ref;
                                            } }
                                            key={ item }
                                            name={ item }
                                            handleStatChange={ this.handleStatChange }
                                        />
                                    ) )}
                                </div>
                                <div className="stats-group col-3">
                                    <span className="title">Special</span>
                                    <StatsInput
                                        value={ playerDetails }
                                        ref={ ref => {
                                            this.potential = ref;
                                        } }
                                        name="potential"
                                        handleStatChange={ this.handleStatChange }
                                    />
                                    <Dropdown
                                        value={ playerDetails.internationalReputation }
                                        ref={ ref => {
                                            this.internationalReputation = ref;
                                        } }
                                        elements={ Dictionary.stars }
                                        label="reputation"
                                        small
                                    />
                                    <Dropdown
                                        value={ playerDetails.skillMoves }
                                        ref={ ref => {
                                            this.skillMoves = ref;
                                        } }
                                        elements={ Dictionary.stars }
                                        label="skill moves"
                                        small
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter( Players );
