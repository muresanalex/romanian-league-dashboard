import React, { Component } from "react";

class StatsInput extends Component { // eslint-disable-line
    constructor() {
        super();
        this.state = {
            defaultValue: 50,
        };
    }

    render() {
        let backgroundColor;

        const { value, name } = this.props;
        const { defaultValue } = this.state;
        const renderValue = this.state.changedValue || value || defaultValue;
        
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
        }
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
