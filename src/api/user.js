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
// 注册
export function register({ username, password, repassword }) {
    const url = '/user/register';
    const data = {
        username,
        password,
        repassword
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 登录
export function login({ username, password }) {
    const url = '/user/login';
    const data = {
        username,
        password
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 获取播放历史
export function getPlayHistory() {
    const url = '/user/history';
    return axios.get(url).then(res => Promise.resolve(res.data));
}
// 增加播放历史
export function pushPlayHistory({ type, songid }) {
    const url = '/user/history';
    const data = {
        type,
        songid
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 获取的收藏歌曲
export function getCollectedMusic() {
    const url = '/user/favorite';
    return axios.get(url).then(res => Promise.resolve(res.data));
}
// 收藏一首歌曲
export function collectMusic({ type, songid }) {
    const url = '/user/favorite';
    const data = {
        type,
        songid
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 取消收藏一首歌曲
export function cancelCollectedMusic({ type, songid }) {
    const url = '/user/favorite';
    const data = {
        type,
        songid
    };
    return axios.delete(url, data).then(res => Promise.resolve(res.data));
}
// 获取收藏的歌单
export function getCollectedList() {
    const url = '/user/favorite_list';
    return axios.get(url).then(res => Promise.resolve(res.data));
}
// 收藏某一个歌单
export function collectList({ type, listid }) {
    const url = '/user/favorite_list';
    const data = {
        type,
        listid
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 取消收藏某一歌单
export function cancelCollectedList({ type, listid }) {
    const url = '/user/favorite_list';
    const data = {
        type,
        listid
    };
    return axios.delete(url, data).then(res => Promise.resolve(res.data));
}
// 获取音乐来源设置
export function getMusicSrcTypes() {
    const url = '/user/music_src_setting';
    return axios.get(url).then(res => Promise.resolve(res.data));
}
// 设置音乐来源
export function setMusicSrcTypes({ qq, ne, xm }) {
    const url = '/user/music_src_setting';
    const data = { qq, ne, xm };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
// 反馈
export function sendFeedback({ content }) {
    const url = '/user/feedback';
    const data = {
        content
    };
    return axios.post(url, data).then(res => Promise.resolve(res.data));
}
