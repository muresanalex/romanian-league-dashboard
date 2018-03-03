import React, { Component } from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getPlayers } from "../../apiService/apiService";

class PlayersList extends Component {
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
                <Search getResults={ getPlayers } />
                <Pagination getResults={ getPlayers } />
            </div>
        );
    }
}

export default PlayersList;
