/**
 * @constant {Object} commonParam - 公共请求参数
 */
export const commonParam = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
};

/**
 * @constant {Object} options - 公共请求选项
 */
export const options = {
    param: 'jsonpCallback',
    prefix: 'jp'
};

/**
 * @constant {Number} ERR_OK
 */
export const ERR_OK = 0;
