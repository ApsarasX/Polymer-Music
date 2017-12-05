/**
 * @requires axios ajax库
 * @requires jsonp 引入封装好的jsonp函数
 * @requires commonParam,options 引入公共参数和配置
 */
// import axios from 'axios';
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

export const x = '';
