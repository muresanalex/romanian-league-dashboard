import React, { Component } from "react";

class StatsInput extends Component { // eslint-disable-line
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { value, name } = this.props;
        const renderValue = this.state.changedValue || value;
        return (
            <div className="stats-wrapper clearfix">
                <span>{ name }</span>
                <input
                    type="number"
                    value={ renderValue }
                    min="1"
                    max="99"
                    placeholder={ name }
                    onChange={ ( evt ) => this.setState( {
                        changedValue: evt.target.value,
                    } ) }
                />
            </div>
        );
    }
}

export default StatsInput;
