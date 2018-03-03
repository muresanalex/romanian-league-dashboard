import React, { Component } from "react";
import Search from "./search.react";
import { getTeams } from "../../apiService/apiService";

class TeamsList extends Component {
    constructor( ) {
        super();
        this.state = {
            test: "test",
        };
    }

    render() {
        const { test } = this.state;
        return (
            <div>
                <Search getResults={ getTeams } />
                <span>{ test }</span>
            </div>
        );
    }
}

export default TeamsList;
