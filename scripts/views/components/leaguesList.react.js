import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getLeagues } from "../../apiService/apiService";

const LeaguesList = () => (
    <div>
        <Search getResults={ getLeagues } />
        <Pagination getResults={ getLeagues } />
    </div>
);

export default LeaguesList;
