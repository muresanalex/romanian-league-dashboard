import React, { Component } from "react";

class StatsInput extends Component {
    constructor() {
        super();
        this.state = {
            defaultValue: 50,
            changedValue: null,
        };

        this.getValue = this.getValue.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        const { value, name } = nextProps;
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
                    onChange={ ( evt ) => this.setState( {
                        changedValue: evt.target.value,
                    } ) }
                />
                <span>{ name }</span>
            </div>
        );
    }
}

export default StatsInput;
