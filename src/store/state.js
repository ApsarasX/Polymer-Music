import { playMode } from '@/assets/js/config';
import { loadSearch, loadPlay, loadFavorite } from '@/assets/js/cache';
/**
 * @constant state - Vuex状态
 * */
const state = {
    singer: {},
    // 播放状态
    playing: false,
    // 播放器是否展开(全屏)
    fullScreen: false,
    // 所有播放歌曲
    playList: [],
    // 顺序播放列表
    sequenceList: [],
    // 播放模式
    mode: playMode.sequence,
    // 当前播放歌曲
    currentIndex: -1,
    // 歌单
    disc: {},
    // 榜单详情
    topList: {},
    // 搜索历史
    searchHistory: loadSearch(),
    // 播放历史
    playHistory: loadPlay(),
    // 收藏歌曲
    favoriteList: loadFavorite(),
    // 用户中心可见性
    userCenterVisible: false,
    // 播放列表显示
    playListVisible: false
};

export default state;
