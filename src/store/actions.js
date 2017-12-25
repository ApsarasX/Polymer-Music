import * as types from './mutation-types';
import { playMode, popupDelay } from '../assets/js/config';
import { shuffle } from '../assets/js/util';
import {
    saveSearch,
    deleteSearch,
    clearSearch,
    savePlay,
    saveFavorite,
    deleteFavorite,
    saveFavoriteList as saveFavoriteSheet,
    deleteFavoriteList as deleteFavoriteSheet,
    saveSrcTypes
} from '../assets/js/cache';

function findIndex(list, song) {
    return list.findIndex(item => item.id === song.id);
}

/**
 * @function selectPlay 选择播放某一首歌曲
 * @param {*} param0
 * @param {*} param1
 */
export function selectPlay({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === playMode.random) {
        const randomList = shuffle(list);
        commit(types.SET_PLAY_LIST, randomList);
        /* eslint-disable no-param-reassign */
        index = findIndex(randomList, list[index]);
    } else {
        commit(types.SET_PLAY_LIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

/**
 * @function randomPlay 随机播放列中全部歌曲
 */
export function randomPlay({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_PLAY_LIST, shuffle(list));
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

export function insertSong({ commit, state }, song) {
    let currentIndex = state.currentIndex;
    const playList = state.playList.slice();
    const sequenceList = state.sequenceList.slice();
    // 记录当前歌曲
    const currentSong = playList[currentIndex];
    // 查找当前列表中是否有待插入的歌曲, 并返回索引
    const fpIndex = findIndex(playList, song);
    // 因为插入歌曲, 所以索引+1
    currentIndex += 1;
    // 插入这首歌到当前索引
    playList.splice(currentIndex, 0, song);
    // 如果包含这首歌
    if (fpIndex > -1) {
        // 当前当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1);
            currentIndex -= 1;
        } else {
            playList.splice(fpIndex + 1, 1);
        }
    }
    const currentSIndex = findIndex(sequenceList, currentSong) + 1;

    const fsIndex = findIndex(sequenceList, song);

    sequenceList.splice(currentSIndex, 0, song);

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1);
        } else {
            sequenceList.splice(fsIndex + 1, 1);
        }
    }

    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

export function saveSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query));
}

export function deleteSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
}

export function clearSearchHistory({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch());
}
// 从播放列表里删除歌曲
export function deleteSong({ commit, state }, song) {
    let currentIndex = state.currentIndex;
    const playList = state.playList.slice();
    const sequenceList = state.sequenceList.slice();
    const pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);
    const sIndex = findIndex(sequenceList, song);
    sequenceList.splice(sIndex, 1);
    if (currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex -= 1;
    }
    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    // 列表中所有歌曲被删除
    const playingState = playList.length > 0;
    commit(types.SET_PLAYING_STATE, playingState);
}

export function deleteSongList({ commit }) {
    commit(types.SET_PLAY_LIST, []);
    commit(types.SET_SEQUENCE_LIST, []);
    commit(types.SET_CURRENT_INDEX, -1);
    commit(types.SET_PLAYING_STATE, false);
}

export function savePlayHistory({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song));
}

export function saveFavoriteList({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song));
}

export function deleteFavoriteList({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
}

export function saveFavoriteListList({ commit }, list) {
    commit(types.SET_FAVORITE_LIST_LIST, saveFavoriteSheet(list));
}

export function deleteFavoriteListList({ commit }, list) {
    commit(types.SET_FAVORITE_LIST_LIST, deleteFavoriteSheet(list));
}

export function setPopup({ commit }, content) {
    commit(types.SET_POPUP_CONTENT, content);
    commit(types.SET_POPUP_VISIBLE, true);
    setTimeout(() => {
        commit(types.SET_POPUP_CONTENT, '');
        commit(types.SET_POPUP_VISIBLE, false);
    }, popupDelay);
}

export function setSrcTypes({ commit }, srcTypes) {
    commit(types.SET_SRC_TYPES, srcTypes);
    saveSrcTypes(srcTypes);
}
