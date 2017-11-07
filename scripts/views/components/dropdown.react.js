import React from "react";

const Dropdown = ( { elements, label } ) => { // eslint-disable-line
    const options = elements ? elements.map( createElements ) : "";
    const style = label === "country" || label === "team" ? { width: "150px" } : {};
    return (
        <div className="dropdown-container">
            <select style={ style }>
                { options }
            </select>
            <span>{ label || "" }</span>
        </div>
    );
};

function createElements( element, index ) {
    return (
        <option key={ index }>{ element }</option>
    );
}

export default Dropdown;
