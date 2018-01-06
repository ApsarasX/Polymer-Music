'use strict';

require('./check-versions')();

const config = require('../config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const axios = require('axios');
const bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = express.Router();
const userRoutes = express.Router();
apiRoutes.get('/getDiscList', async (req, res) => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    try {
        const response = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
});
apiRoutes.get('/getSongList', async (req, res) => {
    const url =
        'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    try {
        const response = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        });
        let ret = response.data;
        if (typeof ret === 'string') {
            const reg = /^\w+\(({.+})\)$/;
            const matches = ret.match(reg);
            if (matches) {
                ret = JSON.parse(matches[1]);
            }
        }
        res.json(ret);
    } catch (err) {
        console.error(err);
        throw err;
    }
});
apiRoutes.get('/lyric', async (req, res) => {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    try {
        const response = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        });
        let ret = response.data;
        if (typeof ret === 'string') {
            const reg = /^\w+\(({[^()]+})\)$/;
            const matches = ret.match(reg);
            if (matches) {
                ret = JSON.parse(matches[1]);
            }
        }
        res.json(ret);
    } catch (err) {
        console.error(err);
        throw err;
    }
});
apiRoutes.get('/search', async (req, res) => {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    try {
        const response = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: req.query
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        throw err;
    }
});
userRoutes.post('/login', (req, res) => {
    setTimeout(() => {
        res.json({
            code: 0,
            data: {
                uid: '1',
                username: 'pyyzcwg2833',
                nickname: '风硕依源',
                mobile: '13201685806',
                register_time: 1513781141482,
                last_login_time: 1513781141482
            }
        });
    }, 3000);
});
app.use('/api', apiRoutes);
app.use('/user', userRoutes);
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// serve pure static assets
const staticPath = path.posix.join(
    config.dev.assetsPublicPath,
    config.dev.assetsSubDirectory
);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
    _resolve();
});

const server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};
