import React, { Component } from "react";
import Search from "./search.react";

class CountriesList extends Component {
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
                <Search />
                <span>{ test }</span>
            </div>
        );
    }
}

export default CountriesList;
