import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Teams from "./teams.react";
import Players from "./players.react";
import Leagues from "./leagues.react";
import Countries from "./countries.react";

class UpdateItem extends Component {
    constructor( ) {
        super();
        this.state = {
            id: "",
            type: "",
        };
    }
    componentWillMount() {
        const { pathname } = this.props.history.location;

        let type = "";

        if ( pathname.indexOf( "/players/" ) > -1 ) {
            type = "players";
        } else if ( pathname.indexOf( "/teams/" ) > -1 ) {
            type = "teams";
        } else if ( pathname.indexOf( "/leagues/" ) > -1 ) {
            type = "leagues";
        } else if ( pathname.indexOf( "/countries/" ) > -1 ) {
            type = "countries";
        }

        const id = pathname.split( `/${ type }/` )[ 1 ];

        this.setState( {
            id,
            type,
        } );
    }

    render() {
        const { id, type } = this.state;

        if ( type === "players" ) {
            return <Players id={ id } />;
        } else if ( type === "teams" ) {
            return <Teams id={ id } />;
        } else if ( type === "leagues" ) {
            return <Leagues id={ id } />;
        } else if ( type === "countries" ) {
            return <Countries id={ id } />;
        }
        return false;
    }
}

export default withRouter( UpdateItem );
