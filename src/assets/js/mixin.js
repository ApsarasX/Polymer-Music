import { mapGetters, mapMutations, mapActions } from 'vuex';
import { shuffle } from '@/assets/js/util';
import { playMode } from '@/assets/js/config';

// 列表相关的Mixin
// export const playListMixin = {
//     computed: {
//         ...mapGetters(['playList', 'miniPlayerVisible'])
//     },
//     mounted() {
//         this.handlePlayList(this.playList);
//     },
//     activated() {
//         this.handlePlayList(this.playList);
//     },
//     watch: {
//         playList(newVal) {
//             this.handlePlayList(newVal);
//         }
//     },
//     methods: {
//         handlePlayList() {
//             throw new Error('component must implement handlePlayList method');
//         }
//     }
// };

// 播放相关Mixin
export const playerMixin = {
    computed: {
        // 播放模式的图标
        iconMode() {
            const modeIcons = ['icon-sequence', 'icon-loop', 'icon-random'];
            return modeIcons[this.mode];
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playList',
            'mode',
            'favoriteList'
        ])
    },
    methods: {
        changeMode() {
            // 改变播放模式
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            } else {
                list = this.sequenceList;
            }
            // 在set播放列表之前找到当前歌曲的index
            this._resetCurrentIndex(list);
            // set新的播放列表
            this.setPlayList(list);
        },
        // 判断是否为收藏歌曲
        isFavorite(song) {
            const index = this.favoriteList.findIndex(
                item => item.id === song.id
            );
            return index > -1;
        },
        getFavoriteIcon(song) {
            return this.isFavorite(song)
                ? 'icon-favorite'
                : 'icon-not-favorite';
        },
        togglefavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song);
            } else {
                this.saveFavoriteList(song);
            }
        },
        _resetCurrentIndex(list) {
            // 在播放列表中找到当前歌曲index
            const index = list.findIndex(
                item => item.id === this.currentSong.id
            );
            this.setCurrentIndex(index);
        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAY_LIST'
        }),
        ...mapActions(['saveFavoriteList', 'deleteFavoriteList'])
    }
};
// 搜索相关Mixin
export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 100
        };
    },
    computed: {
        ...mapGetters(['searchHistory'])
    },
    methods: {
        // 点击关键词, 自动填充query
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },
        // 滚动时隐藏手机键盘
        blurInput() {
            this.$refs.searchBox.blur();
        },
        // 保存搜索结果
        saveSearch() {
            this.saveSearchHistory(this.query);
        },
        onQueryChange(query) {
            this.query = query;
        },
        ...mapActions(['saveSearchHistory', 'deleteSearchHistory'])
    }
};
