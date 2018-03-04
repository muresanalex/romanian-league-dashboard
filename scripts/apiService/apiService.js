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

function getPlayer( id ) {
    return fetch( `${ baseUrl }/players/${ id }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.player );
}

function getTeam( id ) {
    return fetch( `${ baseUrl }/teams/${ id }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.team );
}

function getLeague( id ) {
    return fetch( `${ baseUrl }/leagues/${ id }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.league );
}

function getCountry( id ) {
    return fetch( `${ baseUrl }/countries/${ id }` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.country );
}

function updatePlayer( payload, id ) {
    return fetch( `${ baseUrl }/players/${ id }`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function updateTeam( payload, id ) {
    return fetch( `${ baseUrl }/teams/${ id }`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function updateLeague( payload, id ) {
    return fetch( `${ baseUrl }/leagues/${ id }`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
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

function deletePlayer( id ) {
    return fetch( `${ baseUrl }/players/${ id }`, { method: "DELETE" } )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function deleteTeam( id ) {
    return fetch( `${ baseUrl }/teams/${ id }`, { method: "DELETE" } )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function deleteLeague( id ) {
    return fetch( `${ baseUrl }/leagues/${ id }`, { method: "DELETE" } )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

function deleteCountry( id ) {
    return fetch( `${ baseUrl }/countries/${ id }`, { method: "DELETE" } )
        .then( ( response ) => response.json() )
        .then( ( data ) => data );
}

export {
    createPlayer,
    createTeam,
    createCountry,
    createLeague,
    getPlayers,
    getTeams,
    getLeagues,
    getCountries,
    getPlayer,
    getTeam,
    getLeague,
    getCountry,
    updatePlayer,
    updateTeam,
    updateLeague,
    updateCountry,
    deletePlayer,
    deleteTeam,
    deleteCountry,
    deleteLeague,
};
