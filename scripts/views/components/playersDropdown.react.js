import React, { Component } from "react";

class PlayersDropdown extends Component {
    state = {
        selectedPlayer: "",
    };

    componentWillMount() {
        if ( this.props.value && !this.state.selectedPlayer ) {
            this.setState( { selectedPlayer: this.props.value } );
        }
    }

    getValue = () => this.state.selectedPlayer;

    buildOptions = player => (
        <option key={ player._id } value={ player._id }>
            {`${ player.position } - ${ player.fullName }`}
        </option>
    );

    handleOptionPick = evt => this.setState( { selectedPlayer: evt.target.value } );

    render() {
        const options = this.props.players.map( this.buildOptions ).sort( ( option1, option2 ) => {
            if ( option1.props.children < option2.props.children ) {
                return -1;
            }
            if ( option1.props.children > option2.props.children ) {
                return 1;
            }
            return 0;
        } );
        return (
            <div className="players-dropdown-container">
                <span>{this.props.label}</span>
                <select onChange={ this.handleOptionPick } value={ this.state.selectedPlayer }>
                    {options}
                </select>
            </div>
        );
    }
}

export default PlayersDropdown;
