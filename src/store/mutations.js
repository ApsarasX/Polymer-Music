import * as types from './mutation-types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAY_LIST](state, list) {
        state.playList = list;
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list;
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc;
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList;
    },
    [types.SET_SEARCH_HISTORY](state, history) {
        state.searchHistory = history;
    },
    [types.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history;
    },
    [types.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list;
    },
    [types.SET_FAVORITE_LIST_LIST](state, list) {
        state.favoriteListList = list;
    },
    [types.SET_USER_CENTER_VISIBLE](state, visible) {
        state.userCenterVisible = visible;
    },
    [types.SET_PLAY_LIST_VISIBLE](state, visible) {
        state.playListVisible = visible;
    },
    [types.SET_MINI_PLAYER_VISIBLE](state, visible) {
        state.miniPlayerVisible = visible;
    },
    [types.SET_POPUP_VISIBLE](state, visible) {
        state.popupVisible = Boolean(state.popupContent && visible);
    },
    [types.SET_POPUP_CONTENT](state, content) {
        state.popupContent = content;
    },
    [types.UPDATE_DIRECTION](state, direction) {
        state.direction = direction;
    },
    [types.SET_SRC_TYPES](state, srcTypes) {
        state.srcTypes = srcTypes;
    },
    [types.SET_HAS_LOGIN](state, is) {
        state.hasLogin = is;
    },
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = { ...userInfo };
    }
};

export default mutations;
