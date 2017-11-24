/**
 * @requires axios - ajax库
 * @requires jsonp - 引入封装好的jsonp函数
 * @requires commonParam,options - 引入公共参数和配置
 */
import axios from 'axios';
// import jsonp from '@/assets/js/jsonp';
import { commonParam } from './config';

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
        g_tk: 5381,
        format: 'json'
    });
    return axios
        .get(url, {
            params: data
        })
        .then(res => Promise.resolve(res.data));
}

// eslitn占位
export function xx() {}
