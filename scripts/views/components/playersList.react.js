import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getPlayers, deletePlayer } from "../../apiService/apiService";

const PlayersList = () => (
    <div>
        <Search getResults={ getPlayers } />
        <Pagination getResults={ getPlayers } deleteItem={ deletePlayer } />
    </div>
);

export default PlayersList;
