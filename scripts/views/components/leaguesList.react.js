import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getLeagues, deleteLeague } from "../../apiService/apiService";

const LeaguesList = () => (
    <div>
        <Search getResults={ getLeagues } />
        <Pagination getResults={ getLeagues } deleteItem={ deleteLeague } />
    </div>
);

export default LeaguesList;
