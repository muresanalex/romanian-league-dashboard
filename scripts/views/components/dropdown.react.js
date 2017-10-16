import React from "react";

const Dropdown = ( { elements, children } ) => { // eslint-disable-line
    const options = elements ? elements.map( createElements ) : "";
    const childrenElements = children || "";
    return (
        <div className="dropdown-container">
            { childrenElements }
            <select>
                { options }
            </select>
        </div>
    );
};

function createElements( element, index ) {
    return (
        <option key={ index }>{ element }</option>
    );
}

export default Dropdown;
