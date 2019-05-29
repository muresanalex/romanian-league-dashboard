const baseUrl = process.env.BASE_API_URL;
const corsHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
};

function createPlayer( payload ) {
    return fetch( `${ baseUrl }/players`, {
        method: "POST",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function createTeam( payload ) {
    return fetch( `${ baseUrl }/teams`, {
        method: "POST",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function createLeague( payload ) {
    return fetch( `${ baseUrl }/leagues`, {
        method: "POST",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function createCountry( payload ) {
    return fetch( `${ baseUrl }/countries`, {
        method: "POST",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function createFormation( payload ) {
    return fetch( `${ baseUrl }/formations`, {
        method: "POST",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function getPlayers( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/players${ queryString }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function getTeams( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/teams${ queryString }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function getLeagues( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/leagues${ queryString }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function getCountries( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/countries${ queryString }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function getFormations( query ) {
    const queryString = query || "";
    return fetch( `${ baseUrl }/formations${ queryString }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function getPlayer( id ) {
    return fetch( `${ baseUrl }/players/${ id }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data.player );
}

function getTeam( id ) {
    return fetch( `${ baseUrl }/teams/${ id }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data.team );
}

function getLeague( id ) {
    return fetch( `${ baseUrl }/leagues/${ id }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data.league );
}

function getCountry( id ) {
    return fetch( `${ baseUrl }/countries/${ id }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data.country );
}

function getFormation( id ) {
    return fetch( `${ baseUrl }/formations/${ id }`, { headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data.formation );
}

function updatePlayer( payload, id ) {
    return fetch( `${ baseUrl }/players/${ id }`, {
        method: "PUT",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function updateTeam( payload, id ) {
    return fetch( `${ baseUrl }/teams/${ id }`, {
        method: "PUT",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function updateLeague( payload, id ) {
    return fetch( `${ baseUrl }/leagues/${ id }`, {
        method: "PUT",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function updateCountry( payload, id ) {
    return fetch( `${ baseUrl }/countries/${ id }`, {
        method: "PUT",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function updateFormation( payload, id ) {
    return fetch( `${ baseUrl }/formations/${ id }`, {
        method: "PUT",
        headers: corsHeaders,
        body: JSON.stringify( payload ),
    } );
}

function deletePlayer( { _id } ) {
    return fetch( `${ baseUrl }/players/${ _id }`, { method: "DELETE", headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function deleteTeam( { _id } ) {
    return fetch( `${ baseUrl }/teams/${ _id }`, { method: "DELETE", headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function deleteLeague( { _id } ) {
    return fetch( `${ baseUrl }/leagues/${ _id }`, { method: "DELETE", headers: corsHeaders } ).then( response => response.json() );
}

function deleteCountry( { _id } ) {
    return fetch( `${ baseUrl }/countries/${ _id }`, { method: "DELETE", headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

function deleteFormation( { _id } ) {
    return fetch( `${ baseUrl }/formations/${ _id }`, { method: "DELETE", headers: corsHeaders } )
        .then( response => response.json() )
        .then( data => data );
}

// special requests

function removeTeamFromLeague( team ) {
    const payload = Object.assign( {}, team, { leagueId: "noId" } );
    delete payload._id;
    return updateTeam( payload, team._id );
}

function removePlayerFromTeam( player ) {
    const payload = Object.assign( {}, player, { teamId: "noId" } );
    delete payload._id;
    return updatePlayer( payload, player._id );
}

export {
    createPlayer,
    createTeam,
    createCountry,
    createLeague,
    createFormation,
    getPlayers,
    getTeams,
    getLeagues,
    getCountries,
    getFormations,
    getPlayer,
    getTeam,
    getLeague,
    getCountry,
    getFormation,
    updatePlayer,
    updateTeam,
    updateLeague,
    updateCountry,
    updateFormation,
    deletePlayer,
    deleteTeam,
    deleteCountry,
    deleteLeague,
    deleteFormation,
    removeTeamFromLeague,
    removePlayerFromTeam,
};
