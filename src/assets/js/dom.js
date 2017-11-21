/**
 * @function hasClass - 判断某个DOM元素是否有某个类名
 * @param {DOMObject} el - DOM元素
 * @param {String} className - 类名
 * @returns {Boolean}
 */
export function hasClass(el, className) {
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
    return reg.test(el.className);
}

/**
 * @function addClass - 为DOM元素添加类名
 * @param {DOMObject} el - DOM元素
 * @param {String} className - 类名
 */
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    const newClass = el.className.split(' ');
    newClass.push(className);
    /* eslint-disable no-param-reassign */
    el.className = newClass.join(' ');
}

/**
 * @function getData - 设置或获取DOM元素的属性
 * @param {DOM} el - DOM元素
 * @param {String} name - data属性后缀
 * @param {*} val - 值
 * @returns {undefined|String} undefined(如果设置属性值)或者属性值
 */
export function getData(el, name, val) {
    const attrName = `data-${name}`;
    if (val === undefined) {
        return el.getAttribute(attrName, val);
    }
    return el.setAttribute(attrName);
}
