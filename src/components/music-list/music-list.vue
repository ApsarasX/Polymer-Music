<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper" v-show="songs.length>0" ref="playBtn">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>
 <script>
import Scroll from '@/base/scroll/scroll';
import SongList from '@/base/song-list/song-list';
import Loading from '@/base/loading/loading';
import { prefixStyle } from '@/assets/js/dom';

// 顶部保留高度
const RESERVED_HEIGHT = 40;
// 兼容性CSS transform属性
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

export default {
    props: {
        bgImage: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImage});`;
        }
    },
    data() {
        return {
            scrollY: 0
        };
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
    },
    methods: {
        /**
         * @function scroll - 列表滚动时
         * @param {Object} - 滚动到的新位置
         * */
        scroll(pos) {
            this.scrollY = pos.y;
        },
        /**
         * @function back - 返回上一页
         * */
        back() {
            this.$router.back();
        }
    },
    watch: {
        scrollY(newY) {
            const translateY = Math.max(this.minTranslateY, newY);
            let zIndex = 0;
            let scale = 1;
            let blur = 0;
            // 滚动bg-layer
            this.$refs.layer.style[
                transform
            ] = `translate3d(0, ${translateY}px, 0)`;

            const percent = Math.abs(newY / this.imageHeight);
            // 在最顶部下拉, 放大图片
            if (newY > 0) {
                scale = 1 + percent;
                zIndex = 10;
            } else {
                // 上拉高斯模糊(iOS)
                blur = Math.min(20 * percent, 20);
            }
            this.$refs.filter.style[backdrop] = `blur(${blur})`;
            // 上拉超过顶部
            if (newY < this.minTranslateY) {
                zIndex = 10;
                // 图片高度缩小
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
                // 随机播放按钮隐藏
                this.$refs.playBtn.style.display = 'none';
            } else {
                // 图片恢复原来大小
                this.$refs.bgImage.style.paddingTop = '70%';
                this.$refs.bgImage.style.height = 0;
                // 随机播放按钮显示
                this.$refs.playBtn.style.display = '';
            }
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style[transform] = `scale(${scale})`;
        }
    },
    components: {
        Scroll,
        SongList,
        Loading
    }
};
</script>

 <style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        @include no-wrap;
        text-align: center;
        line-height: 40px;
        font-size: $font-size-large;
        color: $color-text;
    }
    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        .play-wrapper {
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play {
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                border-radius: 100px;
                font-size: 0;
                .icon-play {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: $font-size-medium-x;
                }
                .text {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font-size-small;
                }
            }
        }
        .filter {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer {
        position: relative;
        height: 100%;
        background: $color-background;
    }
    .list {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
        .song-list-wrapper {
            padding: 20px 30px;
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
