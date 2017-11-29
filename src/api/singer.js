/**
 * @requires axios ajax库
 * @requires jsonp 引入封装好的jsonp函数
 * @requires commonParam,options 引入公共参数和配置
 */
// import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';

/**
 * @function getSingerList 获取歌手列表
 * @return {Promise}
 */
export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({}, commonParam, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        g_tk: 5381
    });
    return jsonp(url, data, options);
}

/**
 * @function getSingerDetail 获取歌手详情
 * @param {String} singerId 歌手Id
 * @return {Promise}
 */
export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
    const data = Object.assign({}, commonParam, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        g_tk: 5381,
        singermid: singerId
    });
    return jsonp(url, data, options);
}
