import React, { Component } from "react";
import Search from "./search.react";
import { getLeagues } from "../../apiService/apiService";

class LeaguesList extends Component {
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
                <Search getResults={ getLeagues } />
                <span>{ test }</span>
            </div>
        );
    }
}

export default LeaguesList;
