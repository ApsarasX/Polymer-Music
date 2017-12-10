<template>
    <transition name="slide">
        <div class="search">
            <div class="search-box-wrapper">
                <search-box ref="searchBox" @query="onQueryChange"></search-box>
            </div>
            <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
                <scroll class="shortcut" ref="shortcut" :data="shortcut" :refreshDelay="refreshDelay">
                    <div>
                        <div class="hot-key">
                            <h1 class="title">热门搜索</h1>
                            <ul>
                                <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                                    <span>{{item.k}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="search-history" v-show="searchHistory.length">
                            <h1 class="title">
                                <span class="text">搜索历史</span>
                                <span class="clear" @click="showConfirm">
                                    <i class="icon-clear"></i>
                                </span>
                            </h1>
                            <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
                        </div>
                    </div>
                </scroll>
            </div>
            <div ref="searchResult" class="search-result">
                <suggest ref="suggest" :query="query" v-show="query" @listScroll="blurInput" @select="saveSearch"></suggest>
            </div>
            <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnTxt="清空" @confirm="clearSearchHistory"></confirm>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
import SearchBox from '@/base/search-box/search-box';
import { getHotKey } from '@/api/search';
import { ERR_OK } from '@/api/config';
import Suggest from '@/components/suggest/suggest';
import SearchList from '@/base/search-list/search-list';
import { mapActions } from 'vuex';
import Confirm from '@/base/confirm/confirm';
import Scroll from '../../base/scroll/scroll';
import { playListMixin, searchMixin } from '../../assets/js/mixin';

export default {
    mixins: [playListMixin, searchMixin],
    components: {
        SearchBox,
        Suggest,
        SearchList,
        Confirm,
        Scroll
    },
    computed: {
        shortcut() {
            return this.hotKey.concat(this.searchHistory);
        }
    },
    created() {
        this._getHotKey();
    },
    data() {
        return {
            hotKey: []
        };
    },
    methods: {
        handlePlayList(playList) {
            const bottom = playList.length > 0 ? '60px' : '';
            this.$refs.shortcutWrapper.style.bottom = bottom;
            // 从新计算整体滚动列表
            this.$refs.shortcut.refresh();
            this.$refs.searchResult.style.bottom = bottom;
            // 从新计算搜索结果滚动列表
            this.$refs.suggest.refresh();
        },
        showConfirm() {
            this.$refs.confirm.show();
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0, 12);
                }
            });
        },
        ...mapActions([
            // 'saveSearchHistory',
            // 'deleteSearchHistory',
            'clearSearchHistory'
        ])
    },
    watch: {
        query(newQuery) {
            if (!newQuery) {
                setTimeout(() => {
                    this.$refs.shortcut.refresh();
                }, 20);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.search {
    &.slide-enter-active,
    &.slide-leave-active {
        transition: all 0.3s;
    }
    &.slide-enter,
    &.slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
    .search-box-wrapper {
        padding: 10px;
        background-color: $color-highlight-background;
    }
    .shortcut-wrapper {
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
        z-index: 10;
        .shortcut {
            height: 100%;
            overflow: hidden;
            .hot-key {
                margin: 0 20px 20px 20px;
                .title {
                    margin-bottom: 20px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
                .item {
                    display: inline-block;
                    padding: 5px 10px;
                    margin: 0 12px 10px 0;
                    border-radius: 99px;
                    // background: $color-highlight-background;
                    border: 1px solid $color-text-ll;
                    font-size: $font-size-medium;
                    color: $color-text-ll;
                }
            }
            .search-history {
                position: relative;
                margin: 0 20px;
                .title {
                    display: flex;
                    align-items: center;
                    height: 40px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                    .text {
                        flex: 1;
                    }
                    .clear {
                        @include extend-click;
                        .icon-clear {
                            font-size: $font-size-medium;
                            color: $color-text-d;
                        }
                    }
                }
            }
        }
    }
    .search-result {
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 0;
    }
}
</style>
