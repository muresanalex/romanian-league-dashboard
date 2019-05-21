import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { debounce } from "../../helpers/helpers";

const MIN_CHARACTERS = 3;
const DEBOUNCE_TIMEOUT = 300;

class Search extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            showSpinner: true,
            results: [],
        };
    }

    componentDidMount() {
        window.addEventListener( "click", this.handleBodyClick );
        this.createDebounce();
    }

    componentWillUnmount() {
        window.removeEventListener( "click", this.handleBodyClick );
    }

    createDebounce = () => {
        this.debouncedApiCall = debounce( query => {
            this.props.getResults( query ).then( results => {
                this.setState( {
                    results: results.data,
                    showSpinner: false,
                } );
            } );
        }, DEBOUNCE_TIMEOUT );
    };

    handleBodyClick = evt => {
        const { open } = this.state;
        if ( open && evt.target !== this.input ) {
            this.setState( { open: false } );
        }
    };

    handleClick = evt => {
        if ( evt.target.value.length >= MIN_CHARACTERS ) {
            this.setState( { open: true } );
        }
    };

    handleChange = evt => {
        const { open } = this.state;
        const string = evt.target.value;
        const stringLength = string.length;
        this.setState( { showSpinner: true } );
        if ( stringLength >= MIN_CHARACTERS ) {
            this.debouncedApiCall( `?search=${ string }` );

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
    };

    buildResults = () => {
        const { results } = this.state;
        if ( results.length === 0 ) {
            return <div className="result-line no-result">No results!</div>;
        }

        return <div className="results-container">{results.map( this.buildItems )}</div>;
    };

    buildItems = item => {
        const { _id } = item;
        const { pathname } = this.props.history.location;
        const { push } = this.props.history;

        let { name } = item;

        if ( pathname.indexOf( "players" ) > -1 ) {
            name = `${ item.firstName } ${ item.lastName }`;
        }

        return (
            <button className="result-line" key={ _id } onClick={ () => push( `${ pathname }/${ _id }` ) }>
                {name}
            </button>
        );
    };

    render() {
        const { open, showSpinner } = this.state;
        const openClass = open ? "open" : "";
        const results = this.buildResults();
        return (
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={ this.handleChange }
                    onClick={ this.handleClick }
                    ref={ ref => {
                        this.input = ref;
                    } }
                />
                <div className={ `search-results ${ openClass }` }>
                    {showSpinner && <div className="lds-dual-ring" />}
                    {!showSpinner && results}
                </div>
            </div>
        );
    }
}

export default withRouter( Search );
