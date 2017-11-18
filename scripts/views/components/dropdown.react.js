import React, { Component } from "react";

class Dropdown extends Component {
    constructor() {
        super();
        this.getSelectedValue = this.getSelectedValue.bind( this );
    }

    getSelectedValue() {
        return this.option.options[ this.option.selectedIndex ].text;
    }

    render() {
        const { elements, label } = this.props; // eslint-disable-line
        const options = elements ? elements.map( createElements ) : "";
        const style = label === "country" || label === "team" || label === "league" ? { width: "150px" } : {};
        return (
            <div className="dropdown-container">
                <select style={ style } ref={ ( ref ) => { this.option = ref; } }>
                    { options }
                </select>
                <span>{ label || "" }</span>
            </div>
        );
    }
}

function createElements( element, index ) {
    return (
        <option key={ index }>{ element }</option>
    );
}

export default Dropdown;
