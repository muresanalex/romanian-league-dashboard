import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getCountries, deleteCountry } from "../../apiService/apiService";

const CountriesList = () => (
    <div>
        <Search getResults={ getCountries } />
        <Pagination getResults={ getCountries } deleteItem={ deleteCountry } path="/countries" />
    </div>
);

export default CountriesList;
