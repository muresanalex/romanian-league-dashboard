import React, { Component } from "react";
import ImageUploader from "./imageUploader.react";
import Dropdown from "./dropdown.react";
import StatsInput from "./statsInput.react";
import Dictionary from "../../helpers/dictionary";
// import { createPlayer, getPlayers } from "../../apiService/apiService";

class Players extends Component {
    constructor() {
        super();
        this.state = {
            attackingStats: [ "crossing", "finishing", "heading acc", "short passing", "volleys" ],
            skillStats: [ "dribbling", "curve", "fk accuracy", "long passing", "ball control" ],
            movementStats: [ "acceleration", "sprint speed", "agility", "reactions", "balance" ],
            powerStats: [ "shot power", "jumping", "stamina", "strength", "long shots" ],
            mentalityStats: [ "aggression", "interceptions", "positioning", "vision", "penalties", "composure" ],
            defendingStats: [ "marking", "standing tackle", "sliding tackle" ],
            goalkeepingStats: [ "GK diving", "GK handling", "GK kicking", "GK positioning", "GK reflexes" ],
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
        } = this.state;
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
                        <input
                            type="number"
                            placeholder="nr"
                            min="1"
                            max="99"
                            className="shirt-number"
                        />
                        <span className="shirt-label">number</span>
                        <Dropdown elements={ Dictionary.positions } label="position" />
                        <Dropdown elements={ Dictionary.preferredFoot } label="foot" />
                        <Dropdown elements={ Dictionary.stars } label="weak foot" />
                    </div>
                    <button className="save-button">Save</button>
                </div>
                <div className="stats col-4">
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Attacking</span>
                            { attackingStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Skill</span>
                            { skillStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Movement</span>
                            { movementStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Power</span>
                            { powerStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Mentality</span>
                            { mentalityStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                        <div className="stats-group col-3">
                            <span className="title">Defending</span>
                            { defendingStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="stats-group col-3">
                            <span className="title">Goalkeeping</span>
                            { goalkeepingStats.map( ( item ) => <StatsInput key={ item } name={ item } /> ) }
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
