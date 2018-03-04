import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            numberOfPages: 1,
            currentPage: 1,
        };
        this.buildResults = this.buildResults.bind( this );
        this.buildItem = this.buildItem.bind( this );
        this.buildNumberOfPages = this.buildNumberOfPages.bind( this );
    }

    componentWillMount() {
        const { currentPage } = this.state;
        const { getResults } = this.props;
        getResults( `?page=${ currentPage }` ).then( ( result ) => this.setState( { result: result.data, numberOfPages: result.numberOfPages } ) );
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
                onClick={ this.handleItemClick( _id ) }
            >
                { name }
                <span
                    className="delete-item"
                    onClick={ this.handleDeleteClick( _id ) }
                    ref={ ( ref ) => this[ _id ] = ref }
                >
                    delete
                </span>
            </button>
        );
    }

    handleItemClick( id ) {
        return ( evt ) => {
            const { pathname } = this.props.history.location;
            const { push } = this.props.history;
            if ( evt.target === this[ id ] ){
                return;
            }
            return push( `${ pathname }/${ id }` );
        }
    }

    handleDeleteClick( id ) {
        return ( evt ) => {
            const { deleteItem, getResults } = this.props;
            deleteItem( id ).then( () => {
                getResults( `?page=${ 1 }` ).then( ( result ) => this.setState( { result: result.data, numberOfPages: result.numberOfPages, currentPage: 1 } ) );
            } )
        }
    }

    buildNumberOfPages() {
        const { numberOfPages, currentPage } = this.state;
        const buttons = [];
        for ( let i = 0; i < numberOfPages; i += 1 ) {
            const activeClass = i + 1 === currentPage ? "active" : "";
            const button = (
                <button
                    className={ activeClass }
                    key={ i }
                    onClick={ this.handlePageClick( i ) }
                >
                    { i + 1 }
                </button>
            );
            buttons.push( button );
        }
        return buttons.map( ( item ) => item );
    }

    handlePageClick( position ) {
        return () => {
            const { getResults } = this.props;
            getResults( `?page=${ position + 1 }` ).then( ( result ) => this.setState( { result: result.data, numberOfPages: result.numberOfPages, currentPage: position + 1 } ) );
        };
    }

    render() {
        const results = this.buildResults();
        const numberOfPages = this.buildNumberOfPages();
        return (
            <div>
                <div className="pagination-container">{ results }</div>
                <div className="number-of-pages">{ numberOfPages }</div>
            </div>
        );
    }
}

export default withRouter( Pagination );
