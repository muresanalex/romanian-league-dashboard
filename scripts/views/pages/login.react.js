import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind( this );
    }

    handleLogin() {
        this.props.history.push( "/countries" ); // eslint-disable-line
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="input-wrapper">
                    <span className="welcome-message">Welcome!</span>
                    <div className="input-username">
                        <input type="text" placeholder="username" />
                    </div>
                    <div className="input-password">
                        <input type="password" placeholder="password" />
                    </div>
                    <button className="button login-button" onClick={ this.handleLogin }>Login</button>
                </div>
            </div>
        );
    }
}
export default withRouter( LoginPage );
