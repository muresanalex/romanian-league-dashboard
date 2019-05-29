import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { positions } from "../../enums/positions";
import {
    createFormation,
    getFormation,
    updateFormation,
    deleteFormation,
} from "../../apiService/apiService";
import NotificationCenter from "./notificationCenter.react";

class Formations extends Component {
    state = { activePositions: [], name: "", updatePage: false };

    componentWillMount() {
        const { id } = this.props;
        if ( id ) {
            getFormation( id ).then( formation => {
                this.setState( {
                    name: formation.name,
                    activePositions: formation.activePositions,
                    updatePage: true,
                } );
            } );
        }
    }

    buildButtons = playerPositions =>
        playerPositions.map( position => {
            const isPositionActive = this.state.activePositions.indexOf( position ) > -1;
            const buttonClass = isPositionActive ? "selected" : "";
            return (
                <button className={ buttonClass } key={ position } onClick={ this.handlePositionClick }>
                    {position}
                </button>
            );
        } );

    handlePositionClick = evt => {
        const { activePositions } = this.state;
        const position = evt.target.innerText;
        const isInArray = activePositions.indexOf( position ) > -1;

        if ( !isInArray ) {
            const newArr = [ ...this.state.activePositions, position ];
            this.setState( {
                activePositions: newArr,
            } );
        } else {
            const arrayWithoutCurrentPosition = this.state.activePositions.filter( item => item !== position );
            this.setState( {
                activePositions: arrayWithoutCurrentPosition,
            } );
        }
    };

    handleResponse = response => {
        const { error } = response;
        if ( !error ) {
            this.props.history.push( "/formations" );
        } else {
            this.notification.showMessage( error.details[ 0 ].message );
        }
    };

    handleNameChange = evt => {
        this.setState( { name: evt.target.value } );
    };

    handleSaveButton = () => {
        const { activePositions, name, updatePage } = this.state;
        if ( updatePage ) {
            updateFormation( { activePositions, name }, this.props.id )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        } else {
            createFormation( { activePositions, name } )
                .then( res => res.json() )
                .then( response => this.handleResponse( response ) );
        }
    };

    handleDeleteButton = () => {
        if ( this.props.id ) {
            deleteFormation( { _id: this.props.id } ).then( response => this.handleResponse( response ) );
        }
    };

    render() {
        const gkButton = this.buildButtons( positions.slice( 0, 1 ) );
        const defensiveLineButtons = this.buildButtons( positions.slice( 1, 6 ) );
        const firstMidfieldLine = this.buildButtons( positions.slice( 6, 11 ) );
        const secondMidfieldLine = this.buildButtons( positions.slice( 11, 16 ) );
        const thirdMidfieldLine = this.buildButtons( positions.slice( 16, 19 ) );
        const firstAttackingLine = this.buildButtons( positions.slice( 19, 24 ) );
        const secondAttackingLine = this.buildButtons( positions.slice( 24, 27 ) );
        const saveButtonText = this.props.id ? "Update" : "Save";

        return (
            <div className="formation-container">
                <NotificationCenter
                    ref={ ref => {
                        this.notification = ref;
                    } }
                />
                <input
                    type="text"
                    placeholder="formation name"
                    value={ this.state.name }
                    onChange={ this.handleNameChange }
                />
                <div className="formation-wrapper">
                    <div className="row">{gkButton}</div>
                    <div className="row">{defensiveLineButtons}</div>
                    <div className="row">{firstMidfieldLine}</div>
                    <div className="row">{secondMidfieldLine}</div>
                    <div className="row">{thirdMidfieldLine}</div>
                    <div className="row">{firstAttackingLine}</div>
                    <div className="row">{secondAttackingLine}</div>
                </div>
                <button className="button save-button" onClick={ this.handleSaveButton }>
                    {saveButtonText}
                </button>
                {this.props.id && (
                    <button className="button delete-button" onClick={ this.handleDeleteButton }>
                        Delete
                    </button>
                )}
            </div>
        );
    }
}

export default withRouter( Formations );
