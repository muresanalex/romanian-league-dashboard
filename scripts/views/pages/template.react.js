import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/navbar.react";
import Countries from "../components/countries.react";
import CountriesList from "../components/countriesList.react";
import Leagues from "../components/leagues.react";
import Teams from "../components/teams.react";
import Players from "../components/players.react";

const Template = () => (
    <div className="template clearfix">
        <Navbar />
        <Switch>
            <Route exact path="/" component={ CountriesList } />
            <Route exact path="/countries/new-country" component={ Countries } />
            <Route exact path="/countries/:_id" component={ Countries } />
            <Route exact path="/countries" component={ CountriesList } />
            <Route exact path="/leagues/new-league" component={ Leagues } />
            <Route exact path="/teams/new-team" component={ Teams } />
            <Route exact path="/players/new-player" component={ Players } />
        </Switch>
    </div>
);

export default Template;
