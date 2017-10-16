import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/navbar.react";
import Countries from "../components/countries.react";
import Leagues from "../components/leagues.react";
import Teams from "../components/teams.react";
import Players from "../components/players.react";

const Template = () => (
    <div className="template clearfix">
        <Navbar />
        <Switch>
            <Route exact path="/countries" component={ Countries } />
            <Route exact path="/leagues" component={ Leagues } />
            <Route exact path="/teams" component={ Teams } />
            <Route exact path="/players" component={ Players } />
        </Switch>
    </div>
);

export default Template;
