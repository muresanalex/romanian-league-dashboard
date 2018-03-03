import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getCountries } from "../../apiService/apiService";

const MIN_CHARACTERS = 3;

class Search extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            results: [],
        };

        this.buildResults = this.buildResults.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.buildItems = this.buildItems.bind( this );
    }

    handleChange( evt ) {
        const { open } = this.state;
        const string = evt.target.value;
        const stringLength = string.length;
        if ( stringLength >= MIN_CHARACTERS ) {
            getCountries( `?search=${ string }` ).then( ( results ) => this.setState( { results } ) );

            if ( !open ) {
                this.setState( {
                    open: true,
                } );
            }
        } else if ( stringLength < MIN_CHARACTERS && open ) {
            this.setState( {
                open: false,
            } );
        }
    }

    buildResults() {
        const { results } = this.state;
        if ( results.length === 0 ) {
            return (
                <div className="result-line no-result">No result!</div>
            );
        }

        return (
            <div className="results-container" >
                {
                    results.map( this.buildItems )
                }
            </div>
        );
    }

    buildItems( item ) {
        const { name, _id } = item;
        return (
            <button
                className="result-line"
                key={ _id }
                onClick={ () => this.props.history.push( `/countries/${ _id }` ) }
            >
                { name }
            </button>
        );
    }

    render() {
        const { open } = this.state;
        const openClass = open ? "open" : "";
        const results = this.buildResults();
        return (
            <div className="search-container">
                <input type="text" placeholder="Search" onChange={ this.handleChange } />
                <div className={ `search-results ${ openClass }` }>{ results }</div>
            </div>
        );
    }
}

export default withRouter( Search );
