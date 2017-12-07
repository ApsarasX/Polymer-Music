<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
                <div class="list-wrapper">
                    <scroll ref="songList" :refreshDelay="refreshDelay" v-if="currentIndex==0" :data="playHistory" class="list-scroll">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                    <scroll ref="searchList" :refreshDelay="refreshDelay" v-if="currentIndex===1" :data="searchHistory" class="list-scroll">
                        <div class="list-inner">
                            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>
<script>
import SearchBox from '@/base/search-box/search-box';
import Suggest from '../suggest/suggest';
import { searchMixin } from '../../assets/js/mixin';
import Switches from '../../base/switches/switches';
import Scroll from '../../base/scroll/scroll';
import { mapGetters, mapActions } from 'vuex';
import SongList from '../../base/song-list/song-list';
import Song from '../../assets/js/song';
import SearchList from '../../base/search-list/search-list';
import TopTip from '../../base/top-tip/top-tip';

export default {
    mixins: [searchMixin],
    data() {
        return {
            showFlag: false,
            showSinger: false,
            currentIndex: 0,
            switches: [{ name: '最近播放' }, { name: '搜索历史' }]
        };
    },
    computed: {
        ...mapGetters(['playHistory', 'searchHistory'])
    },
    methods: {
        show() {
            this.showFlag = true;
            setTimeout(() => {
                if (this.currentIndex === 0) {
                    this.$refs.songList.refresh();
                } else {
                    this.$refs.searchList.refresh();
                }
            }, 20);
        },
        hide() {
            this.showFlag = false;
        },
        selectSuggest() {
            this.saveSearch();
            this.showTip();
        },
        switchItem(index) {
            this.currentIndex = index;
        },
        selectSong(song, index) {
            if (index !== 0) {
                this.insertSong(new Song(song));
                this.showTip();
            }
        },
        showTip() {
            this.$refs.topTip.show();
        },
        ...mapActions(['insertSong'])
    },
    components: {
        SearchBox,
        Suggest,
        Switches,
        Scroll,
        SongList,
        SearchList,
        TopTip
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;
    &.slide-enter-active,
    &.slide-leave-active {
        transition: all 0.3s;
    }
    &.slide-enter,
    &.slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .header {
        position: relative;
        height: 44px;
        text-align: center;
        .title {
            line-height: 44px;
            font-size: $font-size-large;
            color: $color-text;
        }
        .close {
            position: absolute;
            top: 0;
            right: 8px;
            .icon-close {
                display: block;
                padding: 12px;
                font-size: 20px;
                color: $color-theme;
            }
        }
    }

    .search-box-wrapper {
        margin: 20px;
    }
    .shortcut {
        .list-wrapper {
            position: absolute;
            top: 165px;
            bottom: 0;
            width: 100%;
            .list-scroll {
                height: 100%;
                overflow: hidden;
                .list-inner {
                    padding: 20px 30px;
                }
            }
        }
    }
    .search-result {
        position: fixed;
        top: 124px;
        bottom: 0;
        width: 100%;
    }
    .tip-title {
        text-align: center;
        padding: 18px 0;
        font-size: 0;
        .icon-ok {
            font-size: $font-size-medium;
            color: $color-theme;
            margin-right: 4px;
        }
        .text {
            font-size: $font-size-medium;
            color: $color-text;
        }
    }
}
</style>
