import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getCountries } from "../../apiService/apiService";

const CountriesList = () => (
    <div>
        <Search getResults={ getCountries } />
        <Pagination getResults={ getCountries } />
    </div>
);

export default CountriesList;
