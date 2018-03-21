import React from "react";

const Overall = ( { renderValue } ) => {
    let backgroundColor = "#E9573E";
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
    };
    return (
        <span className="overall" style={ style }>{ renderValue }</span>
    );
};

export default Overall;
