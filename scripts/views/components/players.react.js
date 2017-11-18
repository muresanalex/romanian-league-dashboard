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
    }

    render() {
        const { currentPlayer } = this.state;

        if ( !currentPlayer ) {
            return false;
        }
        return (
            <div className="player-container grid-container">
                <div className="details col-2">
                    <ImageUploader />
                    <input
                        type="text"
                        placeholder="first name"
                        className="player-name"
                    />
                    <input
                        type="text"
                        placeholder="last name"
                        className="player-name"
                    />
                    <input
                        type="date"
                        className="birth-date"
                    />
                    <div className="row">
                        <div className="col-2">
                            <input
                                type="number"
                                placeholder="height"
                                min="150"
                                max="220"
                                className="player-height"
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
                            />
                            <span className="measure-unit">kg</span>
                        </div>
                    </div>
                    
                    <div className="dropdown-section">
                        <Dropdown elements={ [] } label="country" />
                        <Dropdown elements={ [] } label="team" />
                        <Dropdown elements={ Dictionary.positions } label="position" />
                        <Dropdown elements={ Dictionary.noNumbers } label="shirt number" />
                        <Dropdown elements={ Dictionary.preferredFoot } label="foot" />
                        <Dropdown elements={ Dictionary.stars } label="weak foot" />
                    </div>
                    <button className="save-button">Save</button>
                </div>
                <div className="stats col-4">
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Attacking</span>
                            <StatsInput name="crossing" value={ currentPlayer.crossing } />
                            <StatsInput name="finishing" value={ currentPlayer.finishing } />
                            <StatsInput name="heading acc." value={ currentPlayer.headingAccuracy } />
                            <StatsInput name="short passing" value={ currentPlayer.shortPassing } />
                            <StatsInput name="volleys" value={ currentPlayer.volleys } />
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Skill</span>
                            <StatsInput name="dribbling" value={ currentPlayer.dribbling } />
                            <StatsInput name="curve" value={ currentPlayer.curve } />
                            <StatsInput name="fk accuracy" value={ currentPlayer.freeKickAccuracy } />
                            <StatsInput name="long passing" value={ currentPlayer.longPassing } />
                            <StatsInput name="ball control" value={ currentPlayer.ballControl } />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Movement</span>
                            <StatsInput name="acceleration" value={ currentPlayer.acceleration } />
                            <StatsInput name="sprint speed" value={ currentPlayer.sprintSpeed } />
                            <StatsInput name="agility" value={ currentPlayer.agility } />
                            <StatsInput name="reactions" value={ currentPlayer.reactions } />
                            <StatsInput name="balance" value={ currentPlayer.balance } />
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Power</span>
                            <StatsInput name="shot power" value={ currentPlayer.shotPower } />
                            <StatsInput name="jumping" value={ currentPlayer.jumping } />
                            <StatsInput name="stamina" value={ currentPlayer.stamina } />
                            <StatsInput name="strength" value={ currentPlayer.strength } />
                            <StatsInput name="long shots" value={ currentPlayer.longShots } />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Mentality</span>
                            <StatsInput name="aggression" value={ currentPlayer.aggression } />
                            <StatsInput name="interceptions" value={ currentPlayer.interceptions } />
                            <StatsInput name="positioning" value={ currentPlayer.positioning } />
                            <StatsInput name="vision" value={ currentPlayer.vision } />
                            <StatsInput name="penalties" value={ currentPlayer.penalties } />
                            <StatsInput name="composure" value={ currentPlayer.composure } />
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Defending</span>
                            <StatsInput name="marking" value={ currentPlayer.marking } />
                            <StatsInput name="standing tackle" value={ currentPlayer.standingTackle } />
                            <StatsInput name="sliding tackle" value={ currentPlayer.slidingTackle } />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Goalkeeping</span>
                            <StatsInput name="GK diving" value={ currentPlayer.gkDiving } />
                            <StatsInput name="GK handling" value={ currentPlayer.gkHandling } />
                            <StatsInput name="GK kicking" value={ currentPlayer.gkKicking } />
                            <StatsInput name="GK positioning" value={ currentPlayer.gkPositioning } />
                            <StatsInput name="GK reflexes" value={ currentPlayer.gkReflexes } />
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Special</span>
                            <StatsInput name="potential" />
                            <Dropdown elements={ Dictionary.stars } label="reputation" />
                            <Dropdown elements={ Dictionary.stars } label="skill moves" />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Players;
