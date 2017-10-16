function createPlayer( payload ) {
    return fetch( "http://localhost:4000/api/players", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( payload ),
    } );
}

function getPlayers() {
    return fetch( "http://localhost:4000/api/players" )
        .then( ( response ) => response.json() )
        .then( ( data ) => data.players );
}

export {
    createPlayer,
    getPlayers,
};
