import React from "react";

const defaultValue = 50;

const Overall = ( { renderValue } ) => {
    const value = renderValue || defaultValue;

    let colorClass = "red";
    if ( value < 51 ) {
        colorClass = "red";
    } else if ( value < 61 ) {
        colorClass = "orange";
    } else if ( value < 71 ) {
        colorClass = "yellow";
    } else if ( value < 81 ) {
        colorClass = "light-green";
    } else {
        colorClass = "dark-green";
    }

    return <span className={ `overall ${ colorClass }` }>{value}</span>;
};

export default Overall;
