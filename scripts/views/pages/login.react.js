import React from "react";

const Login = () => (
    <div className="form-wrapper">
        <form
            name="loginForm"
            action="/auth/login"
            method="post"
            className="login-form"
        >
            <h1><strong>Login</strong></h1>
            <input type="text" name="userName" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Log in" />
        </form>
    </div>
);

export default Login;
