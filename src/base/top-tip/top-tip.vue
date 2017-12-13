<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        delay: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        show() {
            this.showFlag = true;
            // 延迟2s关闭提示
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.hide();
            }, this.delay);
        },
        hide() {
            this.showFlag = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.top-tip {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
    background: $color-highlight-background;
    box-shadow: 0 2px 14px 2px rgba(0, 0, 0, 0.12);
    &.drop-enter-active,
    &.drop-leave-active {
        transition: all 0.3s;
    }
    &.drop-enter,
    &.drop-leave-to {
        transform: translate3d(0, -100%, 0);
    }
}
</style>
