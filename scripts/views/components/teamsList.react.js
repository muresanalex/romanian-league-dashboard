import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getTeams } from "../../apiService/apiService";

const TeamsList = () => (
    <div>
        <Search getResults={ getTeams } />
        <Pagination getResults={ getTeams } />
    </div>
);

export default TeamsList;
