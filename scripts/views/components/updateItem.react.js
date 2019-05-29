import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Teams from "./teams.react";
import Players from "./players.react";
import Leagues from "./leagues.react";
import Countries from "./countries.react";
import Formations from "./formations.react";

class UpdateItem extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            type: "",
        };
    }
    componentWillMount() {
        const { pathname } = this.props.history.location;
        const type = getType( pathname );
        const id = pathname.split( `/${ type }/` )[ 1 ];

        this.setState( {
            id,
            type,
        } );
    }

    componentWillReceiveProps( nextProps ) {
        const { pathname } = nextProps.history.location;
        const { type } = this.state;
        const newType = getType( pathname );

        if ( type !== newType ) {
            const id = pathname.split( `/${ newType }/` )[ 1 ];

            this.setState( {
                id,
                type: newType,
            } );
        }
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
        } else if ( type === "formations" ) {
            return <Formations id={ id } />;
        }
        return false;
    }
}

function getType( pathname ) {
    if ( pathname.indexOf( "/players/" ) > -1 ) {
        return "players";
    } else if ( pathname.indexOf( "/teams/" ) > -1 ) {
        return "teams";
    } else if ( pathname.indexOf( "/leagues/" ) > -1 ) {
        return "leagues";
    } else if ( pathname.indexOf( "/countries/" ) > -1 ) {
        return "countries";
    } else if ( pathname.indexOf( "/formations/" ) > -1 ) {
        return "formations";
    }

    return "";
}

export default withRouter( UpdateItem );
