const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const baseConfig = require('./webpack.config.base');

const dev = {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true,
    overlay: {
        error: true
    },
    historyApiFallback: {
        index: '/index.html'
    },
    proxy: {
        '/(top|music|query|lyric)': {
            target: 'http://www.junejulys.com:3001',
            changeOrigin: true
        }
    }
};

const defaultPlugins = [
    new VueLoaderPlugin(),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
    }),
    new Webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': isDev? "'development'": "'productions'"
        }
    })
];

let config = {};

if (isDev) {
    config = merge(baseConfig, {
        devServer: dev,
        plugins: defaultPlugins.concat([
            new Webpack.HotModuleReplacementPlugin()
        ]),
        devtool: '#cheap-module-eval-source-map'
    });
} else {
    config =  merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/main.js')
        },
        output: {
            filename: '[name].js'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minSize: 0,
                        minChunks: 8,
                        maxInitialRequests: 8
                    },
                    vendor: {
                        test: /node_modules/,
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunksFilename: '[name].min.css'
            })
        ])
    });
}

module.exports = config;