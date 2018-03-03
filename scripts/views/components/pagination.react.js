import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
        };
        this.buildResults = this.buildResults.bind( this );
        this.buildItem = this.buildItem.bind( this );
    }

    componentWillMount() {
        const { getResults } = this.props;
        getResults().then( ( result ) => this.setState( { result } ) );
    }

    buildResults() {
        const { result } = this.state;

        if ( result.length === 0 ) {
            return (
                <div className="no-result">No result!</div>
            );
        }

        const items = result.map( this.buildItem );

        return (
            <div className="results-container">
                { items }
            </div>
        );
    }

    buildItem( item ) {
        const { pathname } = this.props.history.location;
        const { push } = this.props.history;
        const { _id } = item;
        let { name } = item;

        if ( pathname.indexOf( "players" ) > -1 ) {
            name = `${ item.firstName } ${ item.lastName }`;
        }

        return (
            <button
                key={ _id }
                className="result-item"
                onClick={ () => push( `${ pathname }/${ _id }` ) }
            >
                { name }
            </button>
        );
    }

    render() {
        const results = this.buildResults();
        return (
            <div className="pagination-container">{ results }</div>
        );
    }
}

export default withRouter( Pagination );
