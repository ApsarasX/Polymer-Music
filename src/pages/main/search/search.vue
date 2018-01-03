<template>
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
                            <span class="clear" @click="showConfirm=true">
                                <i class="material-icons">delete</i>
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
        <mu-dialog :open="showConfirm" title="清空" @close="closeConfirm">
            是否清空所有搜索历史
            <mu-flat-button slot="actions" @click="closeConfirm" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="confirmClear" label="清空" />
        </mu-dialog>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import SearchBox from '@/base/search-box/search-box';
import { getHotKey } from '@/api/search';
import { ERR_OK } from '@/api/config';
import Suggest from '@/components/suggest/suggest';
import SearchList from '@/base/search-list/search-list';
import { mapActions } from 'vuex';
import Scroll from '@/base/scroll/scroll';
import { searchMixin } from '@/assets/js/mixin';

export default {
    mixins: [searchMixin],
    components: {
        SearchBox,
        Suggest,
        SearchList,
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
            hotKey: [],
            showConfirm: false
        };
    },
    methods: {
        closeConfirm() {
            this.showConfirm = false;
        },
        confirmClear() {
            this.clearSearchHistory();
            this.closeConfirm();
        },
        _getHotKey() {
            getHotKey().then(res => {
                if (res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0, 12);
                }
            });
        },
        ...mapActions(['clearSearchHistory'])
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
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
.search-box-wrapper {
    padding: 10px;
    background-color: $color-highlight-background;
}
.shortcut-wrapper {
    width: 100%;
    height: calc(100vh - 148px);
    padding-top: 20px;
    position: relative;
    z-index: 100;
}
.shortcut {
    height: 100%;
    overflow: hidden;
}
.hot-key {
    margin:0 20px 20px;
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
        border: 1px solid $color-text-ll;
        font-size: $font-size-medium;
        color: $color-text-ll;
    }
}
.search-history {
    position: relative;
    margin: 0 20px;
    bottom: 20px;
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
            .material-icons {
                font-size: $font-size-large-x;
                color: $color-text-l;
            }
        }
    }
}
.search-result {
    position: fixed;
    width: 100%;
    top: 160px;
    bottom: 0;
}
</style>
