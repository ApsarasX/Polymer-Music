/**
 * @requires axios ajax库
 * @requires jsonp 引入封装好的jsonp函数
 * @requires commonParam,options 引入公共参数和配置
 */
// import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';

/**
 * @function getTopList 获取排行榜
 * @return {Promise}
 */
export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        needNewCode: 1
    });
    return jsonp(url, data, options);
}

/**
 * @function getMusicList 获取某个排行榜的音乐列表
 * @param {String} topid 排行榜的id
 * @return {Promise}
 */
export function getMusicList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        needNewCode: 1,
        page: 'detail',
        type: 'top',
        tpl: 3,
        topid
    });
    return jsonp(url, data, options);
}
