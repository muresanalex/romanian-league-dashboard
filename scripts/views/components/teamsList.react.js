import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getTeams, deleteTeam } from "../../apiService/apiService";

const TeamsList = () => (
    <div>
        <Search getResults={ getTeams } />
        <Pagination getResults={ getTeams } deleteItem={ deleteTeam } path="/teams" />
    </div>
);

export default TeamsList;
