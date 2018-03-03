const baseUrl = "http://localhost:4000/api";

function createPlayer( payload ) {
    return fetch( `${ baseUrl }/players`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function createTeam ( payload ) {
    return fetch( `${ baseUrl }/teams`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function createLeague ( payload ) {
    return fetch( `${ baseUrl }/leagues`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function createCountry ( payload ) {
    return fetch( `${ baseUrl }/countries`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function getPlayers( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/players${ queryString }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function getTeams( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/teams${ queryString }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function getLeagues( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/leagues${ queryString }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function getCountries( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/countries${ queryString }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function getCountry( id ) {
    return fetch( `${ baseUrl }/countries/${ id }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.country );
}

function updateCountry( payload, id ) {
    return fetch( `${ baseUrl }/countries/${ id }`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

export {
    createPlayer,
    createCountry,
    getPlayers,
    getCountries,
    createLeague,
    getLeagues,
    createTeam,
    getTeams,
    getCountry,
    updateCountry,
};
