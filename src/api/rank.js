/**
 * @requires axios - ajax库
 * @requires jsonp - 引入封装好的jsonp函数
 * @requires commonParam,options - 引入公共参数和配置
 */
// import axios from 'axios';
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';

export function getTopList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        needNewCode: 1
    });
    return jsonp(url, data, options);
}


export const x = 11;
