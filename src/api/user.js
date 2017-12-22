import axios from 'axios';

// 获取验证码
export function getVcode(mobile) {
    const url = '/user/validate';
    const data = {
        vtype: 1,
        mobile
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 根据验证码验证手机号
export function validateMobile({ mobile, vcode }) {
    const url = '/user/validate';
    const data = {
        vtype: 2,
        mobile,
        vcode
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
