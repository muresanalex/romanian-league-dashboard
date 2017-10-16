import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import StatsInput from "./statsInput.react";
import Dictionary from "../../helpers/dictionary";
import { createPlayer, getPlayers } from "../../apiService/apiService";

class Players extends Component {
    constructor() {
        super();
        this.state = {
            currentPlayer: {},
        };
        this.handleChangeName = this.handleChangeName.bind( this );
        this.handleChangeHeight = this.handleChangeHeight.bind( this );
        this.handleChangeWeight = this.handleChangeWeight.bind( this );
    }

    componentWillMount() {
        const numbers = [];
        for ( let i = 1; i < 100; i++ ) {
            numbers.push( i );
        }
        this.setState( { numbers } );
    }

    componentDidMount() {
        getPlayers().then( ( players ) => this.setState( {
            playersList: players,
            currentPlayer: players[ 0 ],
        } ) );
    }

    handleChangeName( evt ) {
        this.setState( { changedName: evt.target.value } );
    }

    handleChangeHeight( evt ) {
        this.setState( { changedHeight: evt.target.value } );
    }

    handleChangeWeight( evt ) {
        this.setState( { changedWeight: evt.target.value } );
    }

    render() {
        const { playersList, currentPlayer } = this.state;
        const playersNames = playersList ? getPlayersNames( playersList ) : Dictionary.noPlayers;
        const playerName = this.state.changedName || currentPlayer.name;
        const playerHeight = this.state.changedHeight || currentPlayer.height;
        const playerWeight = this.state.changedWeight || currentPlayer.weight;
        const countries = this.state.countries || Dictionary.noCountries;
        const teams = this.state.teams || Dictionary.noTeams;

        if ( !currentPlayer ) {
            return false;
        }
        return (
            <div className="player-container">
                <div className="col-4">
                    <Dropdown elements={ playersNames } />
                    <button className="button create-button" onClick={ handleCreatePlayer }>Create</button>
                    <button className="button remove-button">Remove</button>
                    <div className="logo-wrapper">
                        <ImageUploader />
                        <button className="button save-button">Save</button>
                    </div>
                </div>
                <div className="col-4 margin-top-large">
                    <div className="input-group clearfix">
                        <input
                            type="text"
                            placeholder="name"
                            value={ playerName }
                            onChange={ this.handleChangeName }
                            className="player-name pull-left"
                        />
                        <input type="date" className="birth-date pull-right" />
                    </div>
                    <div className="input-group clearfix">
                        <input
                            type="number"
                            placeholder="height"
                            value={ playerHeight }
                            min="150"
                            max="220"
                            onChange={ this.handleChangeHeight }
                            className="player-height pull-left"
                        />
                        <input
                            type="number"
                            placeholder="weight"
                            min="50"
                            max="130"
                            value={ playerWeight }
                            onChange={ this.handleChangeWeight }
                            className="player-weight pull-right"
                        />
                    </div>
                    <Dropdown elements={ countries }>
                        <span className="dropdown-children">country</span>
                    </Dropdown>
                    <Dropdown elements={ teams }>
                        <span className="dropdown-children">team</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.positions }>
                        <span className="dropdown-children">position</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.noNumbers }>
                        <span className="dropdown-children">number</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.preferredFoot }>
                        <span className="dropdown-children">foot</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.stars }>
                        <span className="dropdown-children">reputation</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.stars }>
                        <span className="dropdown-children">weak foot</span>
                    </Dropdown>
                    <Dropdown elements={ Dictionary.stars }>
                        <span className="dropdown-children">skill moves</span>
                    </Dropdown>
                </div>
                <div className="col-4 stats">
                    <StatsInput name="crossing" value={ currentPlayer.crossing } />
                    <StatsInput name="finishing" value={ currentPlayer.finishing } />
                    <StatsInput name="heading acc." value={ currentPlayer.headingAccuracy } />
                    <StatsInput name="short passing" value={ currentPlayer.shortPassing } />
                    <StatsInput name="volleys" value={ currentPlayer.volleys } />
                    <StatsInput name="dribbling" value={ currentPlayer.dribbling } />
                    <StatsInput name="curve" value={ currentPlayer.curve } />
                    <StatsInput name="fk accuracy" value={ currentPlayer.freeKickAccuracy } />
                    <StatsInput name="long passing" value={ currentPlayer.longPassing } />
                    <StatsInput name="ball control" value={ currentPlayer.ballControl } />
                    <StatsInput name="acceleration" value={ currentPlayer.acceleration } />
                    <StatsInput name="sprint speed" value={ currentPlayer.sprintSpeed } />
                    <StatsInput name="agility" value={ currentPlayer.agility } />
                    <StatsInput name="reactions" value={ currentPlayer.reactions } />
                    <StatsInput name="balance" value={ currentPlayer.balance } />
                    <StatsInput name="shot power" value={ currentPlayer.shotPower } />
                    <StatsInput name="jumping" value={ currentPlayer.jumping } />
                    <StatsInput name="stamina" value={ currentPlayer.stamina } />
                    <StatsInput name="strength" value={ currentPlayer.strength } />
                    <StatsInput name="long shots" value={ currentPlayer.longShots } />
                    <StatsInput name="aggression" value={ currentPlayer.aggression } />
                    <StatsInput name="interceptions" value={ currentPlayer.interceptions } />
                    <StatsInput name="positioning" value={ currentPlayer.positioning } />
                    <StatsInput name="vision" value={ currentPlayer.vision } />
                    <StatsInput name="penalties" value={ currentPlayer.penalties } />
                    <StatsInput name="composure" value={ currentPlayer.composure } />
                    <StatsInput name="marking" value={ currentPlayer.marking } />
                    <StatsInput name="standing tackle" value={ currentPlayer.standingTackle } />
                    <StatsInput name="sliding tackle" value={ currentPlayer.slidingTackle } />
                    <StatsInput name="GK diving" value={ currentPlayer.gkDiving } />
                    <StatsInput name="GK handling" value={ currentPlayer.gkHandling } />
                    <StatsInput name="GK kicking" value={ currentPlayer.gkKicking } />
                    <StatsInput name="GK positioning" value={ currentPlayer.gkPositioning } />
                    <StatsInput name="GK reflexes" value={ currentPlayer.gkReflexes } />
                </div>
            </div>
        );
    }
}

function handleCreatePlayer() {
    const defaultPlayer = {
        name: "New Player",
        country: "Romania",
        dateOfBirth: new Date( "05/18/1992" ),
        height: 187,
        weight: 79,
        teamId: 1,
        position: "GK",
        jerseyNumber: 18,
        preferredFoot: "right",
        internationalReputation: 1,
        weakFoot: 2,
        skillMoves: 1,
        crossing: 50,
        finishing: 50,
        headingAccuracy: 50,
        shortPassing: 50,
        volleys: 50,
        dribbling: 50,
        curve: 50,
        freeKickAccuracy: 50,
        longPassing: 50,
        ballControl: 50,
        acceleration: 50,
        sprintSpeed: 50,
        agility: 50,
        reactions: 50,
        balance: 50,
        shotPower: 50,
        jumping: 50,
        stamina: 50,
        strength: 50,
        longShots: 50,
        aggression: 50,
        interceptions: 50,
        positioning: 50,
        vision: 50,
        penalties: 50,
        composure: 50,
        marking: 50,
        standingTackle: 50,
        slidingTackle: 50,
        gkDiving: 50,
        gkHandling: 50,
        gkKicking: 50,
        gkPositioning: 50,
        gkReflexes: 50,
    };
    createPlayer( defaultPlayer );
}

function getPlayersNames( playersList ) {
    return playersList.map( ( player ) => player.name );
}

export default Players;
