import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
        this.handleClick = this.handleClick.bind( this );
        this.handleBodyClick = this.handleBodyClick.bind( this );
    }

    componentDidMount() {
        window.addEventListener( "click", this.handleBodyClick );
    }

    componentWillUnmount() {
        window.removeEventListener( "click", this.handleBodyClick );
    }

    handleBodyClick( evt ) {
        const { open } = this.state;
        if ( open && evt.target !== this.input ) {
            this.setState( { open: false } );
        }
    }

    handleClick( evt ) {
        if ( evt.target.value.length >= MIN_CHARACTERS ) {
            this.setState( { open: true } );
        }
    }

    handleChange( evt ) {
        const { open } = this.state;
        const { getResults } = this.props;
        const string = evt.target.value;
        const stringLength = string.length;
        if ( stringLength >= MIN_CHARACTERS ) {
            getResults( `?search=${ string }` ).then( ( results ) => this.setState( { results: results.data } ) );

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
        const { _id } = item;
        const { pathname } = this.props.history.location;
        const { push } = this.props.history;

        let { name } = item;

        if ( pathname.indexOf( "players" ) > -1 ) {
            name = `${ item.firstName } ${ item.lastName }`;
        }

        return (
            <button
                className="result-line"
                key={ _id }
                onClick={ () => push( `${ pathname }/${ _id }` ) }
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
                <input
                    type="text"
                    placeholder="Search"
                    onChange={ this.handleChange }
                    onClick={ this.handleClick }
                    ref={ ( ref ) => this.input = ref }
                />
                <div className={ `search-results ${ openClass }` }>{ results }</div>
            </div>
        );
    }
}

export default withRouter( Search );
