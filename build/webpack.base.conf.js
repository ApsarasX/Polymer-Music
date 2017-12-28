'use strict';

const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const HappyPack = require('happypack');
const threadSize = require('os').cpus().length;
const happyThreadSize = Math.min(threadSize, 8);
const happyThreadPool = HappyPack.ThreadPool({ size: happyThreadSize });
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src')
        },
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'happypack/loader?id=eslint',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /muse-ui.src.*?js$/,
                loader: 'happypack/loader?id=museui'
            },
            {
                test: /\.vue$/,
                loader: 'happypack/loader?id=vue'
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=js',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'eslint',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'museui',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'vue',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'vue-loader',
                    options: vueLoaderConfig
                }
            ]
        }),
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        })
    ]
};
