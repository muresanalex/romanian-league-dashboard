import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavbarAccordion from "./navbarAccordion.react";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            navitems: [
                {
                    label: "Home",
                    slug: "/",
                },
                {
                    label: "Players",
                    children: [
                        {
                            label: "Players List",
                            slug: "/players",
                        },
                        {
                            label: "Create Player",
                            slug: "/players/new-player",
                        },
                    ],
                },
                {
                    label: "Teams",
                    children: [
                        {
                            label: "Teams List",
                            slug: "/teams",
                        },
                        {
                            label: "Create Team",
                            slug: "/teams/new-team",
                        },
                    ],
                },
                {
                    label: "Leagues",
                    children: [
                        {
                            label: "Leagues List",
                            slug: "/leagues",
                        },
                        {
                            label: "Create League",
                            slug: "/leagues/new-league",
                        },
                    ],
                },
                {
                    label: "Countries",
                    children: [
                        {
                            label: "Countries List",
                            slug: "/countries",
                        },
                        {
                            label: "Create Country",
                            slug: "/countries/new-country",
                        },
                    ],
                },
            ],
        };

        this.buildNavItems = this.buildNavItems.bind( this );
        this.buildItemsWithoutChildren = this.buildItemsWithoutChildren.bind( this );
    }

    buildNavItems() {
        const { navitems } = this.state;
        const items = navitems.map( ( item ) => {
            const hasChildren = Array.isArray( item.children );
            const navbaritem = hasChildren ?
                <NavbarAccordion label={ item.label }>{ item.children }</NavbarAccordion>
                :
                this.buildItemsWithoutChildren( item );
            return <div key={ item.label } >{ navbaritem }</div>;
        } );
        return (
            <div className="navbar-items">
                <div className="dashboard-logo">Dashboard</div>
                <div>{ items }</div>
            </div>
        );
    }

    buildItemsWithoutChildren( item ) {
        const { label, slug } = item;
        const { history } = this.props; // eslint-disable-line

        return (
            <div
                className="navitem-clickable"
                key={ slug }
                onClick={ () => history.push( slug ) }
                role="menuitem"
                tabIndex="-1"
            >
                { label }
            </div>
        );
    }

    render() {
        const navbaritems = this.buildNavItems();
        return (
            <div className="navbar">
                { navbaritems }
            </div>
        );
    }
}

export default withRouter( Navbar );
