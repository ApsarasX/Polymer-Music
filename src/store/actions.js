import * as types from './mutation-types';
import { playMode } from '../assets/js/config';
import { shuffle } from '../assets/js/util';

function findIndex(list, song) {
    return list.findIndex(item => item.id === song.id);
}

/**
 * @function selectPlay - 选择播放某一首歌曲
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
 * @function randomPlay - 随机播放列中全部歌曲
 * @param {*} param0
 * @param {*} param1
 */
export function randomPlay({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_PLAY_LIST, shuffle(list));
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}
