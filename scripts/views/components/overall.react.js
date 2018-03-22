import React from "react";

const defaultValue = 50;

const Overall = ( { renderValue } ) => {
    const value = renderValue || defaultValue;
    let backgroundColor = "#E9573E";
    if ( value < 51 ) {
        backgroundColor = "#E9573E";
    } else if ( value < 61 ) {
        backgroundColor = "#E77E23";
    } else if ( value < 71 ) {
        backgroundColor = "#F6BB43";
    } else if ( value < 81 ) {
        backgroundColor = "#8DC153";
    } else {
        backgroundColor = "#239454";
    }
    const style = {
        backgroundColor,
    };
    return (
        <span className="overall" style={ style }>{ value }</span>
    );
};

export default Overall;
