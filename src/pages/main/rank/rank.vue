<template>
    <div class="rank" ref="rank">
        <scroll class="toplist" :data="topList" ref="topList">
            <ul>
                <li class="item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
                    <div class="icon">
                        <img alt="排行榜封面" width="100" height="100" v-lazy="item.picUrl">
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,innerIndex) in item.songList" :key="innerIndex">
                            <span>{{innerIndex + 1}}</span>
                            <span>{{song.songname}} - {{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import { getTopList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import Scroll from '@/base/scroll/scroll';
import Loading from '@/base/loading/loading';
// import { playListMixin } from '@/assets/js/mixin';
import { mapMutations } from 'vuex';

export default {
    // mixins: [playListMixin],
    created() {
        this._getTopList();
    },
    data() {
        return {
            topList: []
        };
    },
    methods: {
        selectItem(item) {
            this.$router.push({
                path: `/main/rank/${item.id}`
            });
            this.setTopList(item);
        },
        // handlePlayList(playList, bottomEnable = true) {
        //     const bottom = playList.length > 0 && bottomEnable ? '60px' : '';
        //     this.$refs.rank.style.bottom = bottom;
        //     this.$refs.topList.refresh();
        // },
        _getTopList() {
            getTopList().then(res => {
                if (res.code === ERR_OK) {
                    this.topList = res.data.topList;
                }
            });
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        })
    },
    components: {
        Scroll,
        Loading
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
.toplist {
    height: 100%;
    overflow: hidden;
    background-color: $color-highlight-background;
    .item {
        display: flex;
        margin: 0 10px;
        padding-top: 10px;
        height: 100px;
        &:last-child {
            padding-bottom: 20px;
        }
        .icon {
            flex: 0 0 100px;
            width: 100px;
            height: 100px;
        }
        .songlist {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 20px;
            height: 100px;
            overflow: hidden;
            background: $color-background;
            color: $color-text-l;
            font-size: $font-size-small;
            .song {
                @include no-wrap;
                line-height: 26px;
            }
        }
    }
}
.loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
}
</style>
