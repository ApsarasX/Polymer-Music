import { playMode } from '@/assets/js/config';
import {
    loadSearch,
    loadPlay,
    loadFavorite,
    loadFavoriteList,
    loadSrcTypes,
    loadLoginStatus,
    loadUserInfo
} from '@/assets/js/cache';
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
    // 收藏歌单
    favoriteListList: loadFavoriteList(),
    // 用户中心可见性
    userCenterVisible: false,
    // 播放列表显示
    playListVisible: false,
    // mini播放器显示
    miniPlayerVisible: true,
    // 顶部提示框
    popupVisible: false,
    // 顶部提示框内容
    popupContent: '',
    // 主页Tab切换方向
    direction: 'forward',
    // 音乐来源类型
    srcTypes: loadSrcTypes(),
    // 判断用户是否登录
    hasLogin: loadLoginStatus(),
    // 用户信息
    userInfo: {
        ...loadUserInfo()
    }
};

export default state;
