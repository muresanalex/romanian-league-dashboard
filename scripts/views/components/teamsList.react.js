import React, { Component } from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
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
        console.log( test );
        return (
            <div>
                <Search getResults={ getTeams } />
                <Pagination getResults={ getTeams } />
            </div>
        );
    }
}

export default TeamsList;
