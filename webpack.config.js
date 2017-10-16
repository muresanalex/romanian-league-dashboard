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
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};

module.exports = config;
