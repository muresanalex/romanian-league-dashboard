import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            numberOfPages: 1,
            currentPage: 1,
            showSpinner: true,
        };
    }

    componentWillMount() {
        const { currentPage } = this.state;
        const { getResults, id } = this.props;
        const query = id ? `?id=${ id }&page=${ currentPage }` : `?page=${ currentPage }`;
        getResults( query ).then( result => {
            this.setState( {
                result: result.data,
                numberOfPages: result.numberOfPages,
                showSpinner: false,
            } );
        } );
    }

    buildResults = () => {
        const { result } = this.state;

        if ( result.length === 0 ) {
            return <div className="no-result">No results!</div>;
        }

        const items = result.map( this.buildItem );

        return <div className="results-container">{items}</div>;
    };

    buildItem = item => {
        const { path } = this.props;
        const { _id } = item;
        let { name } = item;
        if ( path.indexOf( "players" ) > -1 ) {
            name = `${ item.firstName } ${ item.lastName }`;
        }

        return (
            <button key={ _id } className="result-item" onClick={ this.handleItemClick( _id ) }>
                {name}
                <span
                    className="delete-item"
                    onClick={ this.handleDeleteClick( item ) }
                    ref={ ref => {
                        this[ _id ] = ref;
                    } }
                >
                    delete
                </span>
            </button>
        );
    };

    handleItemClick = id => evt => {
        const { path } = this.props;
        if ( evt.target === this[ id ] ) {
            return;
        }
        this.props.history.push( `${ path }/${ id }` );
    };

    handleDeleteClick = item => () => {
        const { deleteItem, getResults } = this.props;
        const query = this.props.id ? `?id=${ this.props.id }&page=${ 1 }` : `?page=${ 1 }`;
        this.setState( { showSpinner: true } );
        deleteItem( item ).then( () => {
            getResults( query ).then( result =>
                this.setState( {
                    result: result.data,
                    numberOfPages: result.numberOfPages,
                    currentPage: 1,
                    showSpinner: false,
                } ) );
        } );
    };

    buildNumberOfPages = () => {
        const { numberOfPages, currentPage } = this.state;
        const buttons = [];
        const prevPage = currentPage - 1;
        const nextPage = currentPage + 1;
        let firstPage = currentPage === 1 ? currentPage : prevPage;
        let lastPage = currentPage === numberOfPages ? currentPage : nextPage;

        if ( currentPage === 1 && numberOfPages >= 3 ) {
            lastPage += 1;
        } else if ( currentPage === numberOfPages && numberOfPages >= 3 ) {
            firstPage -= 1;
        }

        for ( let i = firstPage; i <= lastPage; i += 1 ) {
            const activeClass = i === currentPage ? "active" : "";
            const button = (
                <button className={ activeClass } key={ i } onClick={ this.handlePageClick( i ) }>
                    {i}
                </button>
            );
            buttons.push( button );
        }

        if ( firstPage > 1 ) {
            const leftDots = (
                <button
                    className="dots"
                    key="leftDots"
                    onClick={ this.handlePageClick( firstPage - 1 ) }
                >
                    ...
                </button>
            );
            buttons.unshift( leftDots );
        }

        if ( lastPage < numberOfPages ) {
            const rightDots = (
                <button
                    className="dots"
                    key="rightDots"
                    onClick={ this.handlePageClick( lastPage + 1 ) }
                >
                    ...
                </button>
            );
            buttons.push( rightDots );
        }
        return buttons.map( item => item );
    };

    handlePageClick = position => () => {
        const { getResults } = this.props;
        const { currentPage } = this.state;

        if ( currentPage === position ) {
            return;
        }

        const query = this.props.id
            ? `?id=${ this.props.id }&page=${ position }`
            : `?page=${ position }`;
        this.setState( { showSpinner: true } );
        getResults( query ).then( result =>
            this.setState( {
                result: result.data,
                numberOfPages: result.numberOfPages,
                currentPage: position,
                showSpinner: false,
            } ) );
    };

    render() {
        const { showSpinner, numberOfPages } = this.state;
        const results = this.buildResults();
        const pages = numberOfPages > 0 ? this.buildNumberOfPages() : false;

        return (
            <div className="pagination-wrapper">
                <div className="pagination-container">
                    {showSpinner && <div className="lds-dual-ring" />}
                    {!showSpinner && results}
                </div>
                {pages && <div className="number-of-pages">{pages}</div>}
            </div>
        );
    }
}

export default withRouter( Pagination );
