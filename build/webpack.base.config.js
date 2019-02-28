const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.export = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..','dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        // alias: {
        //     '@': path.join(__dirname, '..', 'src')
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/, use: [
                    {
                        loader: 'html-loader', options: {
                            attrs: ['img:src'],
                        }
                    },
                ]
            },
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}