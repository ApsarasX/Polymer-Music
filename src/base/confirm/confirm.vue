<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="showFlag" @click.stop="unlock">
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div @click.stop="cancel" class="operate-btn left">{{cancelBtnTxt}}</div>
                        <div @click.stop="confirm" class="operate-btn">{{confirmBtnTxt}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        confirmBtnTxt: {
            type: String,
            default: '确定'
        },
        cancelBtnTxt: {
            type: String,
            default: '取消'
        }
    },
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        // 延迟隐藏, 否则在移动端会有300ms延迟而失效
        unlock() {
            if (Date.now() - this.timer > 500) {
                this.hide();
            }
        },
        show() {
            this.timer = Date.now();
            this.showFlag = true;
        },
        hide() {
            this.timer = 2000000000000;
            this.showFlag = false;
        },
        cancel() {
            this.hide();
            this.$emit('cancel');
        },
        confirm() {
            this.hide();
            this.$emit('confirm');
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.confirm {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: $color-background-d;
    &.confirm-fade-enter-active,
    &.confirm-fade-leave-active {
        transition: opacity 0.3s;
        .confirm-content {
            transition: all 0.3s;
            transform: scale(1);
        }
    }
    &.confirm-fade-enter,
    &.confirm-fade-leave-to {
        opacity: 0;
        .confirm-content {
            transform: scale(0);
        }
    }
    .confirm-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        .confirm-content {
            width: 270px;
            background: $color-background;
            .text {
                padding: 19px 15px;
                line-height: 22px;
                text-align: center;
                font-size: $font-size-large;
                color: $color-text;
            }
            .operate {
                display: flex;
                align-items: center;
                text-align: center;
                font-size: $font-size-large;
                .operate-btn {
                    flex: 1;
                    line-height: 22px;
                    padding: 10px 0;
                    border-top: 1px solid $color-background-d;
                    color: $color-text;
                    &.left {
                        border-right: 1px solid $color-background-d;
                    }
                }
            }
        }
    }
}
</style>
