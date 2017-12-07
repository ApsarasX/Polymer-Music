/**
 * @requires axios - ajax库
 * @requires jsonp - 引入封装好的jsonp函数
 * @requires commonParam,options - 引入公共参数和配置
 */
import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';
import getUid from '../assets/js/uid';

/**
 * @function getLyric - 获取歌词请求
 * @param {String} mid - 歌曲id
 * @return {Promise}
 */
export function getLyric(mid) {
    const url = '/api/lyric';
    const data = Object.assign({}, commonParam, {
        songmid: mid,
        pcachetime: Date.now(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format: 'json'
    });
    return axios
        .get(url, {
            params: data
        })
        .then(res => Promise.resolve(res.data));
}

export function getVKey(songmid, filename) {
    const url =
        'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';

    const data = Object.assign({}, commonParam, {
        cid: 205361747,
        format: 'json',
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        uin: 0,
        songmid,
        filename,
        guid: getUid()
    });

    return jsonp(
        url,
        data,
        Object.assign({}, options, {
            param: 'callback'
        })
    );
}
