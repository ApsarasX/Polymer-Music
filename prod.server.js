const express = require('express');
const config = require('./config/index');
const axios = require('axios');
const app = express();
const apiRoutes = express.Router();
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
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

const port = process.env.PORT || config.build.port;

module.export = app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.info(`Listening at http://localhost:${port}`);
});
