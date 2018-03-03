import React, { Component } from "react";
import Search from "./search.react";
import { getCountries } from "../../apiService/apiService";

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
                <Search getResults={ getCountries } />
                <span>{ test }</span>
            </div>
        );
    }
}

export default CountriesList;
