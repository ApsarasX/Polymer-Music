<template>
    <!-- BetterScrool作用的标签 -->
    <div class="slider" ref="slider">
        <!-- 滚动区域 -->
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <!-- 滚动提示点 -->
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex===index}"></span>
        </div>
    </div>
</template>

<script>
/**
 * @requires BScroll - UI增强
 * @requires addClass - 公共方法
*/
import BScroll from 'better-scroll';
import { addClass } from '@/assets/js/dom';

export default {
    name: 'slider',
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        };
    },
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 3000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            if (this.autoPlay) {
                this._play();
            }
        }, 20);
        // 监听窗口大小事件, 重新计算slider大小, Slider对象刷新
        window.addEventListener('resize', () => {
            if (!this.slider || !this.slider.enabled) {
                return;
            }
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                if (this.slider.isInTransition) {
                    this._onScrollEnd();
                } else if (this.autoPlay) {
                    this._play();
                }
                this.refresh();
            }, 60);
        });
    },
    activated() {
        this.slider.enable();
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (pageIndex > this.dots.length) {
            pageIndex %= this.dots.length;
        }
        this.slider.goToPage(pageIndex, 0, 0);
        if (this.loop) {
            pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
            this._play();
        }
    },
    deactivated() {
        this.slider.disable();
        clearTimeout(this.timer);
    },
    beforeDestroy() {
        this.slider.disable();
        clearTimeout(this.timer);
    },
    methods: {
        refresh() {
            if (this.slider) {
                this._setSliderWidth(true);
                this.slider.refresh();
            }
        },
        /**
         * @private
         * @function _setSliderWidth - 根据实际DOM计算Slider的宽度
         */
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
            const sliderWidth = this.$refs.slider.clientWidth;

            for (let i = 0; i < this.children.length; i += 1) {
                const item = this.children[i];
                addClass(item, 'slider-item');
                /* eslint-disable no-param-reassign */
                item.style.width = `${sliderWidth}px`;
                width += sliderWidth;
            }
            // 第一次渲染, 预留出循环播放的宽度
            if (this.loop && !isResize) {
                width += 2 * sliderWidth;
            }
            this.$refs.sliderGroup.style.width = `${width}px`;
        },

        /**
         * @private
         * @function _initDots - 初始化Dots
         */
        _initDots() {
            this.dots = new Array(this.children.length).fill(1);
        },

        /**
         * @private
         * @function _initSlider - 初始化Slider
         */
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false, // 惯性
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                }
            });
            this.slider.on('scrollEnd', this._onScrollEnd);

            this.slider.on('touchend', () => {
                if (this.autoPlay) {
                    this._play();
                }
            });

            this.slider.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer);
                }
            });
        },
        _onScrollEnd() {
            let pageIndex = this.slider.getCurrentPage().pageX;
            if (this.loop) {
                pageIndex -= 1;
            }
            this.currentPageIndex = pageIndex;
            if (this.autoPlay) {
                this._play();
            }
        },
        _play() {
            const pageIndex = this.slider.getCurrentPage().pageX + 1;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400);
            }, this.interval);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.slider {
    min-height: 1px;
    position: relative;
}
.slider-group {
    overflow: hidden;
    white-space: nowrap;
}
.slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
    }
    img {
        display: block;
        width: 100%;
    }
}
.dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
}
.dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $color-text-white-l;
    &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-white-ll;
    }
}
</style>
