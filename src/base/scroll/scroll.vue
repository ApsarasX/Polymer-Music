<!-- scroolView基础组件 -->
<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapMutations, mapGetters } from 'vuex';

const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

export default {
    props: {
        // scroll事件派发设置
        probeType: {
            type: Number,
            default: 3
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
        },
        // 是否上拉刷新
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: true
        },
        // 刷新延迟
        refreshDelay: {
            type: Number,
            default: 20
        },
        direction: {
            type: String,
            default: DIRECTION_V
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, this.refreshDelay);
    },
    computed: {
        ...mapGetters(['miniPlayerVisible', 'playList'])
    },
    data() {
        return {
            scrollEvent: []
        };
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
                click: this.click,
                bounce: false,
                eventPassthrough:
                    this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
            });
            // 监听scroll事件
            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('scroll', pos);
                });
            }
            // 监听上拉刷新
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= this.scroll.maxScrollY + 50) {
                        this.$emit('scrollToEnd');
                    }
                });
            }
            this.scroll.on('beforeScrollStart', () => {
                this.scrollEvent = [];
            });
            this.scroll.on('scroll', pos => {
                this.scrollEvent.push(pos.y);
                if (
                    this.scrollEvent[0] -
                        this.scrollEvent[this.scrollEvent.length - 1] >
                        50 &&
                    this.miniPlayerVisible &&
                    this.playList.length > 0
                ) {
                    this.setMiniPlayerVisible(false);
                    this.scrollEvent = [];
                } else if (
                    this.scrollEvent[0] -
                        this.scrollEvent[this.scrollEvent.length - 1] <
                        -70 &&
                    !this.miniPlayerVisible &&
                    this.playList.length > 0
                ) {
                    this.setMiniPlayerVisible(true);
                    this.scrollEvent = [];
                }
            });
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
        },
        ...mapMutations({
            setMiniPlayerVisible: 'SET_MINI_PLAYER_VISIBLE'
        })
    },
    watch: {
        data() {
            // 属性data变化时, 刷新组件
            // 用于在歌单加载后刷新scroll组件
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
