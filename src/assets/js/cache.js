import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LENGTH = 200;

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
