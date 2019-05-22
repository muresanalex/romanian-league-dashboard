import React, { Component } from "react";

class StatsInput extends Component {
    constructor() {
        super();
        this.state = {
            defaultValue: 50,
            changedValue: null,
        };
    }

    componentWillMount() {
        this.setValue( this.props );
    }

    componentWillReceiveProps( nextProps ) {
        const { name } = this.props;
        if ( this.props.value[ name ] !== nextProps.value[ name ] ) {
            this.setValue( nextProps );
        }
    }

    setValue = props => {
        const { value, name } = props;

        this.setState( {
            changedValue: value[ name ],
        } );
    };

    getValue = () => {
        const { changedValue, defaultValue } = this.state;
        return changedValue || defaultValue;
    };

    handleChange = evt => {
        const { name, handleStatChange } = this.props;
        const value = parseInt( evt.target.value, 10 );

        this.setState( {
            changedValue: value,
        } );

        handleStatChange( name, value );
    };

    plusOne = () => {
        const { changedValue, defaultValue } = this.state;
        let newValue = parseInt( defaultValue, 10 ) + 1 > 99 ? 99 : parseInt( defaultValue, 10 ) + 1;
        if ( changedValue ) {
            newValue = parseInt( changedValue, 10 ) + 1 > 99 ? 99 : parseInt( changedValue, 10 ) + 1;
        }

        this.setState( {
            changedValue: newValue,
        } );
    };

    minusOne = () => {
        const { changedValue, defaultValue } = this.state;
        let newValue = parseInt( defaultValue, 10 ) - 1 < 1 ? 1 : parseInt( defaultValue, 10 ) - 1;
        if ( changedValue ) {
            newValue = parseInt( changedValue, 10 ) - 1 < 1 ? 1 : parseInt( changedValue, 10 ) - 1;
        }

        this.setState( {
            changedValue: newValue,
        } );
    };

    render = () => {
        let colorClass;

        const { name } = this.props;
        const { defaultValue } = this.state;
        const renderValue = this.state.changedValue || defaultValue;

        if ( renderValue < 51 ) {
            colorClass = "red";
        } else if ( renderValue < 61 ) {
            colorClass = "orange";
        } else if ( renderValue < 71 ) {
            colorClass = "yellow";
        } else if ( renderValue < 81 ) {
            colorClass = "light-green";
        } else {
            colorClass = "dark-green";
        }

        return (
            <div className="stats-wrapper clearfix">
                <input
                    className={ colorClass }
                    type="number"
                    value={ renderValue }
                    min="1"
                    max="99"
                    placeholder={ name }
                    onChange={ this.handleChange && this.handleChange }
                />
                <span>{name}</span>
            </div>
        );
    };
}

export default StatsInput;
