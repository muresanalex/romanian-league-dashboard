import React, { Component } from "react";

class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "",
        };

        this.getValue = this.getValue.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    componentWillMount( ) {
        const { selectedValue } = this.state;
        const { value, elements } = this.props;

        if ( value !== null && !selectedValue ) {
            const filteredById = elements.filter( ( item ) => item._id === value ).map( ( item ) => item.name )[ 0 ];
            const filteredByValue = elements.filter( ( item ) => item === value )[ 0 ];
            const name = typeof elements[ 0 ] === "object" ? filteredById : filteredByValue;
            this.setState( { selectedValue: name } );
        }
    }

    getValue() {
        const { options, selectedIndex } = this.option;
        const value = options[ selectedIndex ].text;
        const numericValue = parseInt( value, 10 );
        return isNaN( numericValue ) ? value : numericValue;
    }

    handleChange() {
        const { options, selectedIndex } = this.option;
        const value = options[ selectedIndex ].text;
        this.setState( { selectedValue: value } );
    }

    render() {
        const { selectedValue } = this.state;
        const { elements, label } = this.props;
        const options = elements ? elements.map( createElements ) : "";
        const style = label === "country" || label === "team" || label === "league" ? { width: "150px" } : {};

        return (
            <div className="dropdown-container">
                <select
                    onChange={ this.handleChange }
                    value={ selectedValue }
                    style={ style }
                    ref={ ( ref ) => {
                        this.option = ref;
                    } }
                >
                    { options }
                </select>
                <span>{ label || "" }</span>
            </div>
        );
    }
}

function createElements( element, index ) {
    const item = typeof element === "object" ? element.name : element;
    return (
        <option
            key={ index }
        >
            { item }
        </option>
    );
}

export default Dropdown;
