import React, { Component } from "react";

class NotificationCenter extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            message: props.message || "",
            open: false,
        };

        this.showMessage = this.showMessage.bind( this );
        this.hideMessage = this.hideMessage.bind( this );
    }

    hideMessage() {
        const { open } = this.state;
        if ( open ) {
            this.setState( {
                open: false,
                message: "",
                deleteMessage: false,
            } );
        }
    }

    showMessage( message, deleteMessage ) {
        this.setState( {
            open: true,
            message,
            deleteMessage,
        } );
        setTimeout( this.hideMessage, 2000 );
    }

    render() {
        const { message, open, deleteMessage } = this.state;
        const openClassName = open ? "open" : "";
        const deleteClassName = deleteMessage ? "delete" : "";

        return (
            <div className={ `notification-center ${ openClassName } ${ deleteClassName }` }>{ message }</div>
        );
    }
}

export default NotificationCenter;
