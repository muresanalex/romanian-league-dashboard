import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NavbarAccordion extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
        this.handleClick = this.handleClick.bind( this );
    }

    handleClick( ) {
        this.setState( {
            isOpen: !this.state.isOpen,
        } );
    }

    render() {
        const { label, children, history } = this.props; // eslint-disable-line
        const { isOpen } = this.state;
        const openClassName = isOpen ? "open" : "";
        const arrrow = isOpen ? "∧" : "∨";
        return (
            <div
                className={ `navitem ${ openClassName }` }
                key={ label }
                role="menuitem"
                tabIndex="-1"
            >
                <div
                    className="navitem-parent"
                    onClick={ this.handleClick }
                >
                    <span className="label">{ label }</span>
                    <span className="arrow">{ arrrow }</span>
                </div>
                <div className="navitem-children">
                    {
                        children.map( ( item, index ) => (
                            <div
                                className="navitem-child"
                                key={ `${ item.slug } + ${ index }` } // eslint-disable-line
                                onClick={ () => history.push( item.slug ) }
                                role="menuitem"
                                tabIndex="-1"
                            >
                                { item.label }
                            </div>
                        ) )
                    }
                </div>
            </div>
        );
    }
}

export default withRouter( NavbarAccordion );