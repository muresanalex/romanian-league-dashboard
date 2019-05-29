import React from "react";
import Search from "./search.react";
import Pagination from "./pagination.react";
import { getFormations, deleteFormation } from "../../apiService/apiService";

const FormationsList = () => (
    <div>
        <Search getResults={ getFormations } />
        <Pagination getResults={ getFormations } deleteItem={ deleteFormation } path="/formations" />
    </div>
);

export default FormationsList;
