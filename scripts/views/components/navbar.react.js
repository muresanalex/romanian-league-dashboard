import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: "Countries",
            navitems: [ "Countries", "Leagues", "Teams", "Players" ],
        };
        this.setActiveTab = this.setActiveTab.bind( this );
        this.createNavitems = this.createNavitems.bind( this );
    }

    setActiveTab( tab ) {
        this.setState( { activeTab: tab } );
    }

    createNavitems( item, index ) {
        const { activeTab } = this.state;
        const activeClass = item === activeTab ? "active" : "";
        const link = item.toLowerCase();
        return (
            <li className={ activeClass } key={ index }><Link to={ `/${ link }` } onClick={ () => this.setActiveTab( item ) } >{ item }</Link></li>
        );
    }

    render() {
        const { navitems } = this.state;
        return (
            <div className="navbar">
                <ul className="clearfix">
                    { navitems.map( this.createNavitems ) }
                </ul>
            </div>
        );
    }
}
export default Navbar;
