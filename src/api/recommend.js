/**
 * @requires jsonp - 引入封装好的jsonp函数
 * @requires commonParam,options - 引入公共参数和配置
 */
import jsonp from '@/assets/js/jsonp';
import { commonParam, options } from './config';

/**
 * @function getRecommend - 获取推荐数据
 * @returns {Promise}
 */
export function getRecommend() {
    const url =
        'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    /**
     * @description 合并请求数据
     */
    const data = Object.assign({}, commonParam, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });
    return jsonp(url, data, options);
}

/**
 * @deprecated
 */
export function xx() {}
