function getNames( array ) {
    return array.map( ( item ) => item.name );
}

function getId( array, name ) {
    const newArray = array.filter( ( item ) => item.name === name );
    return newArray[ 0 ]._id;
}

export {
    getNames,
    getId,
};
