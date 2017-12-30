<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-show="!recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                    </div>
                </div>
                <!-- 注意此处, 必须有v-if, 否则获取不到数据使得slider的DOM出错-->
                <div v-if="recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider ref="slider">
                            <div v-for="(item,index) in recommends" :key="index">
                                <!-- <a :href="item.linkUrl"> -->
                                    <img @load="loadImage" :src="item.picUrl" alt="slider-img">
                                <!-- </a> -->
                            </div>
                        </slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul class="list">
                        <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" alt="discItem">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
/**
 * @requires Slider - UI组件
 * @requires getRecommend - 公共方法
 * @requires ERR_OK - 配置常量
 */
import Loading from '@/base/loading/loading';
import Scroll from '@/base/scroll/scroll';
import Slider from '@/base/slider/slider';
import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { mapMutations } from 'vuex';
import { createList } from '@/assets/js/list';

export default {
    created() {
        // 获取Slider内容
        this._getRecommend();
        // 获取歌单列表
        this._getDiscList();
    },
    data() {
        return {
            recommends: [],
            discList: []
        };
    },
    activated() {
        setTimeout(() => {
            this.$refs.slider && this.$refs.slider.refresh();
        }, 20);
    },
    components: {
        Slider,
        Scroll,
        Loading
    },
    methods: {
        // 点击歌单进入详情
        selectItem(item) {
            const formatItem = createList(item).format();
            this.$router.push({
                path: `/main/recommend/${formatItem.id}`
            });
            this.setDisc(formatItem);
        },
        // handlePlayList(playList, bottomEnable = true) {
        //     const bottom = playList.length > 0 && bottomEnable ? '60px' : '';
        //     this.$refs.recommend.style.bottom = bottom;
        //     this.$refs.scroll.refresh();
        // },
        /**
         * @private
         * @function _getRecommend - 获取Slider数据
         * */
        async _getRecommend() {
            try {
                const res = await getRecommend();
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            } catch (err) {
                throw err;
            }
        },
        /**
         * @private
         * @function _getDiscList - 获取歌单数据
         * */
        async _getDiscList() {
            try {
                const res = await getDiscList();
                if (res.code === ERR_OK) {
                    this.discList = res.data.list;
                }
            } catch (err) {
                throw err;
            }
        },
        loadImage() {
            if (!this.checkLoaded) {
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                }, 20);
                this.checkLoaded = true;
            }
        },
        ...mapMutations({ setDisc: 'SET_DISC' })
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
.recommend-content {
    height: 100%;
    overflow: hidden;
}
.slider-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
    .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.recommend-list {
    background-color: $color-highlight-background;
    .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
        background-color: $color-background;
    }
    .list {
        padding: 15px 0;
    }
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        margin: 0 15px 10px;
        padding: 10px;
        background-color: $color-background;
        .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $color-text-d;
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
