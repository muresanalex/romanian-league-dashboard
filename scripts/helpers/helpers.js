const DEFUALT_TIMEOUT = 200;

function getNames( array ) {
    return array.map( ( item ) => item.name );
}

function getId( array, name ) {
    const newArray = array.filter( ( item ) => item.name === name );
    return newArray[ 0 ]._id;
}

function debounce( inner, timeout = DEFUALT_TIMEOUT ) {
    let timer = null;
    let resolves = [];

    return function ( ...args ) {
        // Run the function after a certain amount of time
        clearTimeout( timer );
        timer = setTimeout( () => {
        // Get the result of the inner function, then apply it to the resolve function of
        // each promise that has been created since the last time the inner function was run
            const result = inner( ...args );
            resolves.forEach( r => r( result ) );
            resolves = [];
        }, timeout );

        return new Promise( r => resolves.push( r ) );
    };
}

export {
    getNames,
    getId,
    debounce,
};
