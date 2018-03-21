import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/navbar.react";
import Countries from "../components/countries.react";
import CountriesList from "../components/countriesList.react";
import Leagues from "../components/leagues.react";
import LeaguesList from "../components/leaguesList.react";
import Teams from "../components/teams.react";
import TeamsList from "../components/teamsList.react";
import Players from "../components/players.react";
import PlayersList from "../components/playersList.react";
import UpdateItem from "../components/updateItem.react";
import Home from "./home.react";

const Template = () => (
    <div className="template">
        <Navbar />
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/countries" component={ CountriesList } />
            <Route exact path="/countries/new-country" component={ Countries } />
            <Route exact path="/countries/:_id" component={ UpdateItem } />
            <Route exact path="/leagues" component={ LeaguesList } />
            <Route exact path="/leagues/new-league" component={ Leagues } />
            <Route exact path="/leagues/:_id" component={ UpdateItem } />
            <Route exact path="/teams" component={ TeamsList } />
            <Route exact path="/teams/new-team" component={ Teams } />
            <Route exact path="/teams/:_id" component={ UpdateItem } />
            <Route exact path="/players" component={ PlayersList } />
            <Route exact path="/players/new-player" component={ Players } />
            <Route exact path="/players/:_id" component={ UpdateItem } />
        </Switch>
    </div>
);

export default Template;
