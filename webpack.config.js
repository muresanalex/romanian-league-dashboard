const webpack = require( "webpack" );
const dotenv = require( "dotenv" );

dotenv.config();
const envVars = [ "BASE_API_URL" ];

const envObj = Object.keys( process.env )
    .filter( key => envVars.indexOf( key ) > -1 )
    .reduce( ( object, key ) => {
        object[`process.env.${key}`] = JSON.stringify(process.env[key]); //eslint-disable-line
        return object;
    }, {} );

const plugins = [ new webpack.DefinePlugin( envObj ) ];

const config = {
    entry: "./main.js",

    output: {
        path: `${ __dirname }/scripts`,
        filename: "bundle.js",
    },

    devServer: {
        inline: true,
        port: 8080,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",

                query: {
                    presets: [ "es2015", "stage-0", "react" ],
                },
            },
            {
                test: /\.scss$/,
                use: [ "style-loader", "css-loader", "sass-loader" ],
            },
        ],
    },
    plugins,
};

module.exports = config;
