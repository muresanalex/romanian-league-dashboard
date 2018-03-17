import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( route ) {
        return () => this.props.history.push( route );
    }

    render() {
        return (
            <div className="home-wrapper">
                <div className="message-box">
                    <p>Welcome to Romaninan Football Dashboard App</p>
                    <div className="buttons-container">
                        <p>Go to:</p>
                        <button
                            onClick={ this.handleClick( "/players" ) }
                        >
                        Players
                        </button>
                        <button
                            onClick={ this.handleClick( "/teams" ) }
                        >
                        Teams
                        </button>
                        <button
                            onClick={ this.handleClick( "/leagues" ) }
                        >
                        Leagues
                        </button>
                        <button
                            onClick={ this.handleClick( "/countries" ) }
                        >
                        Countries
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter( Home );
