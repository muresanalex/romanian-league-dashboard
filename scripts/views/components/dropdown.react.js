import React, { Component } from "react";

const defaultLabel = "";

class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "",
        };
    }

    componentWillMount() {
        const { selectedValue } = this.state;
        const { value, elements } = this.props;

        if ( value !== null && !selectedValue ) {
            const filteredById = elements
                .filter( item => item._id === value )
                .map( item => item.name )[ 0 ];
            const filteredByValue = elements.filter( item => item === value )[ 0 ];
            const name = typeof elements[ 0 ] === "object" ? filteredById : filteredByValue;
            this.setState( { selectedValue: name } );
        }
    }

    getValue = () => {
        const { options, selectedIndex } = this.option;
        const value = options[ selectedIndex ].text;
        const numericValue = parseInt( value, 10 );
        return isNaN( numericValue ) ? value : numericValue;
    };

    handleChange = () => {
        const { options, selectedIndex } = this.option;
        const value = options[ selectedIndex ].text;

        this.setState( { selectedValue: value } );

        if ( typeof this.props.handleStatChange === "function" ) {
            const props = [];
            if ( this.props.label === "position" ) {
                props.push( this.props.label );
                props.push( value );
            }
            this.props.handleStatChange( ...props );
        }
    };

    render() {
        const { selectedValue } = this.state;
        const { elements, label, small } = this.props;
        const options = elements ? elements.map( createElements ) : "";
        const smallClass = small ? "small" : "";

        return (
            <div className={ `dropdown-container ${ smallClass }` }>
                <span>{label || defaultLabel}</span>
                <select
                    onChange={ this.handleChange }
                    value={ selectedValue }
                    ref={ ref => {
                        this.option = ref;
                    } }
                >
                    {options}
                </select>
            </div>
        );
    }
}

function createElements( element, index ) {
    const item = typeof element === "object" ? element.name : element;
    return <option key={ index }>{item}</option>;
}

export default Dropdown;
