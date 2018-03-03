import React, { Component } from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
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
        console.log( test );
        return (
            <div>
                <Search getResults={ getLeagues } />
                <Pagination getResults={ getLeagues } />
            </div>
        );
    }
}

export default LeaguesList;
