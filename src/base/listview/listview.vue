<template>
    <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="(item, innerIndex) in group.items" :key="innerIndex" class="list-group-item">
                        <img v-lazy="item.avatar" class="avatar" alt="singer_avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item" :class="{'current':currentIndex===index}">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import Scroll from '@/base/scroll/scroll';
import { getData } from '@/assets/js/dom';

// 一个索引的高度
const ANCHOR_HEIGHT = 18;

export default {
    created() {
        // 存储
        this.touch = {};
        // 是否监听滚动
        this.listenScroll = true;
        this.listHeight = [];
        this.probeType = 3;
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0
        };
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        Scroll
    },
    computed: {
        /**
         * @function shortcutList - 整理右侧索引
         */
        shortcutList() {
            return this.data.map(group => group.title.substr(0, 1));
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight();
            }, 20);
        },
        scrollY(newY) {
            const { listHeight } = this;
            // 当滚动到顶部，newY>0
            if (newY > 0) {
                this.currentIndex = 0;
                return;
            }
            // 在中间部分滚动
            for (let i = 0; i < listHeight.length - 1; i += 1) {
                const height1 = listHeight[i];
                const height2 = listHeight[i + 1];
                if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i;
                    this.diff = height2 + newY;
                    return;
                }
            }
            // 当滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2;
        }
    },
    methods: {
        /**
         * @function onShortcutTouchStart - 滚动到右侧滚动条点击位置
         * @param {DOM} e - 点击位置的DOM元素
         */
        onShortcutTouchStart(e) {
            // 获取点击索引的下表号
            const anchorIndex = getData(e.target, 'index');
            // 获取第一个触控点并保存Y轴坐标
            const firstTouch = e.touches[0];
            this.touch.y1 = firstTouch.pageY;
            // 保存当前右侧滚动条的索引值
            this.touch.anchorIndex = anchorIndex;
            // 滚动到相应位置
            this._scrollTo(anchorIndex);
        },
        /**
         * @function onShortcutTouchMove - 拖动索引条
         * @param {DOM} e - 点击位置的DOM元素
         */
        onShortcutTouchMove(e) {
            // 获取触控点的Y轴坐标
            const firstTouch = e.touches[0];
            this.touch.y2 = firstTouch.pageY;
            // 第一个触控点比较计算出偏移索引个数
            const delta = Math.floor(
                (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT
            );
            // 计算当前右侧滚动条索引的理论值
            const anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
            // 滚动到相应位置
            this._scrollTo(anchorIndex);
        },
        /**
         * @function scroll - 滚动
         * @param {Object} pos - 当前位置
         */
        scroll(pos) {
            this.scrollY = pos.y;
        },
        /**
         * @private
         * @function _scrollTo - 根据索引滚动的封装方法
         * @param {Number} index - 右侧滚动条的索引值
        */
        _scrollTo(index) {
            // 滚动到相应位置
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
        },
        /**
         * @private
         * @function _calculateHeight - 计算Group的高度
         */
        _calculateHeight() {
            this.listHeight = [];
            const list = this.$refs.listGroup;
            let height = 0;
            this.listHeight.push(height);
            list.forEach(item => {
                height += item.clientHeight;
                this.listHeight.push(height);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
        padding-bottom: 30px;
        .list-group-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
        .list-group-item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }
    .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .item {
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;
            &.current {
                color: $color-theme;
            }
        }
    }
    .list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
