export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = state => state.playList[state.currentIndex] || {};

export const disc = state => state.disc;

export const topList = state => state.topList;

export const searchHistory = state => state.searchHistory;

export const playHistory = state => state.playHistory;

export const favoriteList = state => state.favoriteList;

export const favoriteListList = state => state.favoriteListList;

export const userCenterVisible = state => state.userCenterVisible;

export const playListVisible = state => state.playListVisible;

export const miniPlayerVisible = state => state.miniPlayerVisible;

export const popupVisible = state => state.popupVisible;

export const popupContent = state => state.popupContent;

export const direction = state => state.direction;

export const srcTypes = state => state.srcTypes;

export const hasLogin = state => state.hasLogin;

export const userInfo = state => state.userInfo;
