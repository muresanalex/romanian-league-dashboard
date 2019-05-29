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
                            label: "Create Player",
                            slug: "/players/new-player",
                        },
                        {
                            label: "Players List",
                            slug: "/players",
                        },
                    ],
                },
                {
                    label: "Teams",
                    children: [
                        {
                            label: "Create Team",
                            slug: "/teams/new-team",
                        },
                        {
                            label: "Teams List",
                            slug: "/teams",
                        },
                    ],
                },
                {
                    label: "Leagues",
                    children: [
                        {
                            label: "Create League",
                            slug: "/leagues/new-league",
                        },
                        {
                            label: "Leagues List",
                            slug: "/leagues",
                        },
                    ],
                },
                {
                    label: "Countries",
                    children: [
                        {
                            label: "Create Country",
                            slug: "/countries/new-country",
                        },
                        {
                            label: "Countries List",
                            slug: "/countries",
                        },
                    ],
                },
                {
                    label: "Formations",
                    children: [
                        {
                            label: "Create Formation",
                            slug: "/formations/new-formation",
                        },
                        {
                            label: "Formations List",
                            slug: "/formations",
                        },
                    ],
                },
            ],
        };
    }

    buildNavItems = () => {
        const { navitems } = this.state;
        const items = navitems.map( item => {
            const hasChildren = Array.isArray( item.children );
            const navbaritem = hasChildren ? (
                <NavbarAccordion label={ item.label }>{item.children}</NavbarAccordion>
            ) : (
                this.buildItemsWithoutChildren( item )
            );
            return <div key={ item.label }>{navbaritem}</div>;
        } );
        return (
            <div className="navbar-items">
                <div className="dashboard-logo">Dashboard</div>
                <div>{items}</div>
            </div>
        );
    };

    buildItemsWithoutChildren = item => {
        const { label, slug } = item;
        const { history } = this.props;

        return (
            <div
                className="navitem-clickable"
                key={ slug }
                onClick={ () => history.push( slug ) }
                role="menuitem"
                tabIndex="-1"
            >
                {label}
            </div>
        );
    };

    render() {
        const navbaritems = this.buildNavItems();
        return <div className="navbar">{navbaritems}</div>;
    }
}

export default withRouter( Navbar );
