import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./views/pages/login.react";
import Template from "./views/pages/template.react";

const App = () => (
    <div className="container">
        <Switch>
            <Route exact path="/" component={ LoginPage } />
            <Route path="/*" component={ Template } />
        </Switch>

    </div>
);

export default App;
