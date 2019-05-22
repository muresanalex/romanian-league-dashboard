import React from "react";

const ImportStats = ( { setPlayerStats } ) => {
    const onReaderLoad = e => {
        setPlayerStats( JSON.parse( e.target.result ) );
    };

    const handleChange = evt => {
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText( evt.target.files[ 0 ] );
    };

    return <input type="file" onChange={ handleChange } />;
};

export default ImportStats;
