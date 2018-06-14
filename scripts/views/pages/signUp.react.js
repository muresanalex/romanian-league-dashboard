import React, { Component } from "react";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            showPassword: false,
        };

        this.togglePassword = this.togglePassword.bind( this );
    }

    togglePassword() {
        this.setState( {
            showPassword: !this.state.showPassword,
        } );
    }

    render() {
        const buttonText = this.state.showPassword ? "hide" : "show";
        const passwordType = this.state.showPassword ? "text" : "password";
        return (
            <div className="sign-up-wrapper">
                <form
                    name="singUpForm"
                    action="/auth/signup"
                    method="post"
                    className="sign-up-form"
                >
                    <h1>Sign Up</h1>
                    <input type="text" name="userName" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <div className="password-wrapper">
                        <input type={ passwordType } name="password" placeholder="Password" />
                        <button className="toggle-password" type="button" onClick={ this.togglePassword }>{ buttonText }</button>
                    </div>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

export default SignUp;
