/**
 * @requires axios ajax库
 * @requires jsonp 引入封装好的jsonp函数
 * @requires commonParam,options 引入公共参数和配置
 */
import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';

/**
 * @function getHotKey 获取热门搜索
 * @return {Promise}
 */
export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        needNewCode: 1
    });
    return jsonp(url, data, options);
}

/**
 * @function search 搜索
 * @param {String} query 搜索关键字
 * @param {Number} page 第几页
 * @param {Boolean} zhida 是否直达(显示歌手)
 * @return {Promise}
 */
export function search(query, page, zhida, perpage) {
    const url = '/api/search';
    const data = Object.assign({}, commonParam, {
        w: query,
        p: page,
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage,
        n: perpage,
        remoteplace: 'txt.mqq.all',
        format: 'json'
    });

    return axios
        .get(url, {
            params: data
        })
        .then(res => Promise.resolve(res.data));
}
