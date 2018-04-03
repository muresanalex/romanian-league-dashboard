import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import fs from "fs";
import config from "../webpack.config";

const port = 8080;
const app = express();
const compiler = webpack( config );

app.use( require( "webpack-dev-middleware" )( compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
} ) );

app.get( "/*", ( req, res ) => {
    fs.readFile( path.resolve( __dirname, "../index.html" ), "utf8", ( err, html ) => {
        res.send( html );
    } );
} );

app.listen( port, ( err ) => {
    if ( err ) {
        console.log( err );
    } else {
        open( `http://localhost:${ port }` );
    }
} );
