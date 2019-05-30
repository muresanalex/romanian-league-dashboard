import React, { Component } from "react";
import { getFormations, getFormation, getPlayers } from "../../apiService/apiService";
import { positions } from "../../enums/positions";
import Dropdown from "./dropdown.react";

class FirstEleven extends Component {
    state = { players: [], availableFormations: [], formation: {}, selectedPlayers: {} };

    componentWillMount() {
        const query = this.props.id ? `?id=${ this.props.id }` : "";
        getFormations().then( results => this.setState( { availableFormations: results.data } ) );
        getPlayers( query ).then( results => this.setState( { players: results.data } ) );
    }

    componentDidMount() {
        const { formation, firstEleven } = this.props;

        if ( formation ) {
            getFormation( formation ).then( result => {
                this.setState( {
                    formation: result,
                    selectedPlayers: firstEleven,
                } );
            } );
        }
    }

    getSelectedFormation = () => this.state.formation;

    getSelectedPlayers = () => this.state.selectedPlayers;

    buildPlayerDropdown = player => (
        <option value={ player._id } key={ player._id }>
            {`${ player.position } - ${ player.fullName }`}
        </option>
    );

    handlePlayerDropdown = pos => () => {
        const { options, selectedIndex } = this[ pos ];
        const value = options[ selectedIndex ].value;

        const newState = Object.assign( {}, this.state.selectedPlayers );
        newState[ pos ] = value;

        this.setState( {
            selectedPlayers: newState,
        } );
    };

    buildPositions = playerPositions =>
        playerPositions.map( pos => {
            const { activePositions } = this.state.formation;
            const isPositionActive = activePositions && activePositions.indexOf( pos ) > -1;
            const selectClass = !isPositionActive ? "hidden" : "";

            return (
                <select
                    className={ selectClass }
                    onChange={ this.handlePlayerDropdown( pos ) }
                    key={ pos }
                    ref={ ref => {
                        this[ pos ] = ref;
                    } }
                    disabled={ !isPositionActive }
                    value={ this.state.selectedPlayers[ pos ] || pos }
                >
                    <option>{pos}</option>
                    {this.state.players.map( this.buildPlayerDropdown ).sort( ( option1, option2 ) => {
                        if ( option1.props.children < option2.props.children ) {
                            return -1;
                        }
                        if ( option1.props.children > option2.props.children ) {
                            return 1;
                        }
                        return 0;
                    } )}
                </select>
            );
        } );

    handleFormationChange = formationName => {
        const selectedFormation = this.state.availableFormations.filter( formation => formation.name === formationName )[ 0 ];
        this.setState( {
            formation: selectedFormation,
            selectedPlayers: {},
        } );
    };

    render() {
        const { availableFormations, formation } = this.state;
        const gkButton = this.buildPositions( positions.slice( 0, 1 ) );
        const defensiveLineButtons = this.buildPositions( positions.slice( 1, 6 ) );
        const firstMidfieldLine = this.buildPositions( positions.slice( 6, 11 ) );
        const secondMidfieldLine = this.buildPositions( positions.slice( 11, 16 ) );
        const thirdMidfieldLine = this.buildPositions( positions.slice( 16, 19 ) );
        const firstAttackingLine = this.buildPositions( positions.slice( 19, 24 ) );
        const secondAttackingLine = this.buildPositions( positions.slice( 24, 27 ) );

        return (
            <div className="first-eleven-wrapper clearfix">
                <Dropdown
                    value={ formation.name }
                    ref={ ref => {
                        this.formation = ref;
                    } }
                    elements={ availableFormations }
                    label="formation"
                    handleStatChange={ this.handleFormationChange }
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
            </div>
        );
    }
}

export default FirstEleven;
