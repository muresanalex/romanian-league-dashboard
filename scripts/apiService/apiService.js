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

function getPlayers() {
    return fetch( `${ baseUrl }/players` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.players );
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

function getCountries() {
    return fetch( `${ baseUrl }/countries` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.countries );
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

function getLeagues() {
    return fetch( `${ baseUrl }/leagues` )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.leagues );
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

export {
    createPlayer,
    createCountry,
    getPlayers,
    getCountries,
    createLeague,
    getLeagues,
    createTeam,
};
