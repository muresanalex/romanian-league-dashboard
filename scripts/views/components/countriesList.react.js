import React, { Component } from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
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
        console.log( test );
        return (
            <div>
                <Search getResults={ getCountries } />
                <Pagination getResults={ getCountries } />
            </div>
        );
    }
}

export default CountriesList;
