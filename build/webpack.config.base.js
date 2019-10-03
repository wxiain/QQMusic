const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createVueLoader = require('./vue-loader.config');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        path: path.join(__dirname, '../client/main.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoader(isDev)
            },
            {
                test: /\.s?css$/,
                use: [
                    'vue-style-loader',
                    isDev? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('postcss-cssnext'),
                                require("postcss-pxtorem")({
                                    "rootValue": 75, // 设计稿宽度的1/10
                                    "propList":["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1000,
                            name: 'resource/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|mkv)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'resource/media/video/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'resource/media/music/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'resource/fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.css', '.scss'],
        alias: {
            '@static': path.join(__dirname, '../', 'static'),
            '@': path.join(__dirname, '../', 'client/component')
        }
    }
};
