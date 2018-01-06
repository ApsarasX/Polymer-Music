import storage from 'good-storage';

window.storage = storage;
const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;
const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;
const FAVORITE_KEY = '__favorite__';
const FAVORITE_LIST_KEY = '__favorite_list__';
const FAVORITE_MAX_LENGTH = 200;
const SRC_TYPES_KEY = '__src_types__';
const TOKEN_KEY = '__token__';
const USER_INFO_KEY = '__user_info__';
const LOGIN_SUGGEST_KEY = '__login_suggest__';

const WEEK_TIME_SPAN = 604800000;
function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (maxLen && arr.length.maxLen) {
        arr.pop();
    }
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

// 保存一条搜索历史
export function saveSearch(query) {
    const searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, item => item === query, SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY, searches);
    return searches;
}
// 从本地缓存读取搜索历史
export function loadSearch() {
    return storage.get(SEARCH_KEY, []);
}

// 删除搜索历史(单个)
export function deleteSearch(query) {
    const searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, item => item === query);
    storage.set(SEARCH_KEY, searches);
    return searches;
}
// 删除所有搜索历史
export function clearSearch() {
    storage.remove(SEARCH_KEY);
    return [];
}
// 将歌曲加入到播放列表
export function savePlay(song) {
    const songs = storage.get(PLAY_KEY, []);
    insertArray(songs, song, item => item.id === song.id, PLAY_MAX_LENGTH);
    storage.set(PLAY_KEY, songs);
    return songs;
}

// 载入播放列表
export function loadPlay() {
    return storage.get(PLAY_KEY, []);
}
// 将歌曲保存到收藏夹
export function saveFavorite(song) {
    const songs = storage.get(FAVORITE_KEY, []);
    insertArray(songs, song, item => item.id === song.id, FAVORITE_MAX_LENGTH);
    storage.set(FAVORITE_KEY, songs);
    return songs;
}
// 将歌曲从收藏夹删除
export function deleteFavorite(song) {
    const songs = storage.get(FAVORITE_KEY, []);
    deleteFromArray(songs, item => item.id === song.id);
    storage.set(FAVORITE_KEY, songs);
    return songs;
}
// 载入收藏夹
export function loadFavorite() {
    return storage.get(FAVORITE_KEY, []);
}
// 载入收藏的歌单
export function loadFavoriteList() {
    return storage.get(FAVORITE_LIST_KEY, []);
}
// 保存收藏的歌单
export function saveFavoriteList(list) {
    const lists = storage.get(FAVORITE_LIST_KEY, []);
    insertArray(lists, list, item => item.id === list.id, FAVORITE_MAX_LENGTH);
    storage.set(FAVORITE_LIST_KEY, lists);
    return lists;
}
// 取消某个歌单的收藏状态
export function deleteFavoriteList(list) {
    const lists = storage.get(FAVORITE_LIST_KEY, []);
    deleteFromArray(lists, item => item.id === list.id);
    storage.set(FAVORITE_LIST_KEY, lists);
    return lists;
}
// 载入本地的音乐源配置
export function loadSrcTypes() {
    return storage.get(SRC_TYPES_KEY, { qq: false, ne: false, xm: false });
}
// 保存用户设置的音乐源
export function saveSrcTypes({ qq = false, ne = false, xm = false }) {
    storage.set(SRC_TYPES_KEY, { qq, ne, xm });
    return { qq, ne, xm };
}

// 载入用户登录状态(本地存储登录状态, 不安全, 未来实现JWT)
// 检测用户上次登陆是否超过7天
export function loadLoginStatus() {
    // 上次登录时间戳
    const lastTimeStamp = storage.get(TOKEN_KEY, 0);
    // 时间差
    const span = Date.now() - lastTimeStamp;
    // 如果小于一星期, 更新时间戳, 并返回登录状态是true
    if (span >= 0 && span <= WEEK_TIME_SPAN) {
        storage.set(TOKEN_KEY, Date.now());
        storage.get(LOGIN_SUGGEST_KEY, true);
        return true;
    }
    return false;
}
// 设置当前时间为上次登录时间
export function saveLoginStatus() {
    return storage.set(TOKEN_KEY, Date.now());
}
// 载入保存的用户信息
export function loadUserInfo() {
    const emptyUserInfo = {
        username: '',
        nickname: '',
        mobile: ''
    };
    const initUserInfo = storage.get(USER_INFO_KEY, {});
    const userInfo = {
        ...emptyUserInfo,
        ...initUserInfo
    };
    return loadLoginStatus() ? userInfo : emptyUserInfo;
}
// 保存用户信息
export function saveUserInfo(outUserInfo) {
    const initUserInfo = storage.get(USER_INFO_KEY, {});
    const userInfo = {
        ...initUserInfo,
        ...outUserInfo
    };
    return storage.set(USER_INFO_KEY, userInfo);
}
