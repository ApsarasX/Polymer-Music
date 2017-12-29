<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest" @beforeScroll="listScroll">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item " v-for="(item,index) in result " :key="index ">
                <div class="icon ">
                    <mu-icon :value="getIcon(item)" :size="20"></mu-icon>
                </div>
                <div class="name ">
                    <p class="text " v-html="getDisplayName(item) "></p>
                </div>
            </li>
            <loading v-show="hasMore"></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉, 暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>
<script>
import { search } from '@/api/search';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';
import Singer from '@/assets/js/singer';
import { mapMutations, mapActions } from 'vuex';
import NoResult from '@/base/no-result/no-result';

const TYPE_SINGER = 'singer';
const perpage = 20;

export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    },
    data() {
        return {
            page: 1,
            result: [],
            // 开启上拉刷新
            pullup: true,
            beforeScroll: true,
            // 有更多搜索结果标志位
            hasMore: true
        };
    },
    methods: {
        // 搜索
        search() {
            this.hasMore = true;
            this.page = 1;
            // 滚动到顶部
            this.$refs.suggest.scrollTo(0, 0);
            search(
                this.query,
                this.page,
                this.showSinger,
                perpage
            ).then(res => {
                if (res.code === ERR_OK) {
                    this.result = this._normalizeResult(res.data);
                    this._checkMore(res.data);
                }
            });
        },
        searchMore() {
            if (!this.hasMore) {
                return;
            }
            this.page += 1;
            // 请求更多数据, 并连接到result
            search(
                this.query,
                this.page,
                this.showSinger,
                perpage
            ).then(res => {
                if (res.code === ERR_OK) {
                    this.result = this.result.concat(
                        this._normalizeResult(res.data)
                    );
                    this._checkMore(res.data);
                }
            });
        },
        getIcon(item) {
            if (item.type === TYPE_SINGER) {
                return 'person';
            }
            return 'music_note';
        },
        getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
                return item.singername;
            }
            return `${item.name}-${item.singer}`;
        },
        // 选择一首歌曲或者歌手
        selectItem(item) {
            // 如果是付费歌曲
            if (item.isPay) {
                this.setPopup('付费歌曲不能播放');
                return;
            }
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                });
                this.setSinger(singer);
                this.$router.push({
                    path: `/main/search/${singer.id}`
                });
            } else {
                this.insertSong(item);
            }
            this.$emit('select');
        },
        refresh() {
            this.$refs.suggest.refresh();
        },
        listScroll() {
            this.$emit('listScroll');
        },
        // 检查是否有更多结果
        _checkMore(data) {
            const { song } = data;
            if (
                !song.list.length ||
                song.curnum + song.curpage * perpage > song.totalnum
            ) {
                this.hasMore = false;
            }
        },
        // 整理结果
        _normalizeResult(data) {
            let ret = [];
            if (data.zhida && data.zhida.singerid) {
                ret.push({
                    ...data.zhida,
                    ...{ type: TYPE_SINGER }
                });
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list));
            }
            return ret;
        },
        _normalizeSongs(list) {
            const ret = [];
            list.forEach(musicData => {
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData));
                }
            });
            return ret;
        },
        /**
         * @function mapMutations - Vuex方法映射
         * */
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions(['insertSong', 'setPopup'])
    },
    watch: {
        query(newQuery) {
            if (!newQuery) {
                return;
            }
            this.search(newQuery);
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.suggest {
    height: 100%;
    overflow: hidden;
}
.suggest-list {
    padding: 0 30px;
    .suggest-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        color: $color-text-l;
        border-bottom: 1px solid $color-split;
    }
    .icon {
        flex: 0 0 30px;
        width: 30px;
    }
    .name {
        flex: 1;
        font-size: $font-size-medium;
        overflow: hidden;
        .text {
            @include no-wrap;
        }
    }
}
.no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
</style>
