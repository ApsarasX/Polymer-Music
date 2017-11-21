<!-- scroolView基础组件 -->
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    props: {
        // scroll事件派发设置
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        // 是否监听滚动
        listenScroll: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        /**
         * @function _initScroll - 初始化scroll对象
         */
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            // 初始化better-scroll
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });
            // 监听scroll事件
            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('scroll', pos);
                });
            }
        },
        // 组件代理better-scroll的三个方法
        enable() {
            this.scroll && this.scroll.enable();
        },
        disable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },

        // 滚动到特定位置
        scrollTo(...args) {
            this.scroll && this.scroll.scrollTo(...args);
        },
        // 滚动到某个元素
        scrollToElement(...args) {
            this.scroll && this.scroll.scrollToElement(...args);
        }
    },
    watch: {
        data() {
            // 属性data变化时, 刷新组件
            // 用于在歌单加载后刷新scroll组件
            setTimeout(() => {
                this.refresh();
            }, 20);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
