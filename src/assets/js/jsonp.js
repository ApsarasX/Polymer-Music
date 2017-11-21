/**
 * @requires jsonp - 引入原始jsonp库
 */
import originJSONP from 'jsonp';

/**
 * @function param - 将数据对象转为querystring字符串
 * @param {Object} data - 请求数据
 * @returns {String} - 返回的querystring字符串
 */
export function param(data) {
    return Object.entries(data)
        .map(([k, v]) => {
            const value = v || '';
            return `${k}=${encodeURIComponent(value)}`;
        })
        .join('&');
}

/**
 * @function jsonp - 对jsonp模块的封装
 * @param {String} url - 请求地址(不带参数)
 * @param {Object} data - 请求数据
 * @param {Object} option - 请求选项
 * @returns {Promise}
 */
export default function jsonp(url, data, option) {
    const realUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + param(data);
    return new Promise((resolve, reject) => {
        originJSONP(realUrl, option, (err, realData) => {
            if (err) {
                reject(err);
            } else {
                resolve(realData);
            }
        });
    });
}
