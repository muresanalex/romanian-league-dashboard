import React, { Component } from "react";
import Search from "./search.react";
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
        return (
            <div>
                <Search getResults={ getPlayers } />
                <span>{ test }</span>
            </div>
        );
    }
}

export default PlayersList;
