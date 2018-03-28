import React, { Component } from "react";

class StatsInput extends Component {
    constructor() {
        super();
        this.state = {
            defaultValue: 50,
            changedValue: null,
        };

        this.getValue = this.getValue.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.plusOne = this.plusOne.bind( this );
        this.minusOne = this.minusOne.bind( this );
    }

    componentWillMount( ) {
        const { value, name } = this.props;
        const { changedValue } = this.state;

        if ( value && !changedValue ) {
            this.setState( {
                changedValue: value[ name ],
            } );
        }
    }

    getValue() {
        const { changedValue, defaultValue } = this.state;
        return changedValue || defaultValue;
    }

    handleChange( evt ) {
        const { name, handleStatChange } = this.props;
        const value = parseInt( evt.target.value, 10 );

        this.setState( {
            changedValue: value,
        } );

        handleStatChange( name, value );
    }

    plusOne() {
        const { changedValue, defaultValue } = this.state;
        let newValue = parseInt( defaultValue, 10 ) + 1 > 99 ? 99 : parseInt( defaultValue, 10 ) + 1;
        if ( changedValue ) {
            newValue = parseInt( changedValue, 10 ) + 1 > 99 ? 99 : parseInt( changedValue, 10 ) + 1;
        }

        this.setState( {
            changedValue: newValue,
        } );
    }

    minusOne() {
        const { changedValue, defaultValue } = this.state;
        let newValue = parseInt( defaultValue, 10 ) - 1 < 1 ? 1 : parseInt( defaultValue, 10 ) - 1;
        if ( changedValue ) {
            newValue = parseInt( changedValue, 10 ) - 1 < 1 ? 1 : parseInt( changedValue, 10 ) - 1;
        }

        this.setState( {
            changedValue: newValue,
        } );
    }

    render() {
        let backgroundColor;

        const { name } = this.props;
        const { defaultValue } = this.state;
        const renderValue = this.state.changedValue || defaultValue;

        if ( renderValue < 51 ) {
            backgroundColor = "#E9573E";
        } else if ( renderValue < 61 ) {
            backgroundColor = "#E77E23";
        } else if ( renderValue < 71 ) {
            backgroundColor = "#F6BB43";
        } else if ( renderValue < 81 ) {
            backgroundColor = "#8DC153";
        } else {
            backgroundColor = "#239454";
        }
        const style = {
            backgroundColor,
        };
        return (
            <div className="stats-wrapper clearfix">
                <input
                    type="number"
                    value={ renderValue }
                    min="1"
                    max="99"
                    style={ style }
                    placeholder={ name }
                    onChange={ this.handleChange && this.handleChange }
                />
                <span>{ name }</span>
            </div>
        );
    }
}

export default StatsInput;
