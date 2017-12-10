<template>
    <transition name="slide">
        <div class="user-center-wrapper" @click="hide" v-show="userCenterVisible">
            <div class="user-center" @click.stop>
                <div class="header">
                    <div class="avatar-wrapper">
                        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144480181,2572619715&fm=27&gp=0.jpg" alt="avatar" class="avatar">
                        <h2 class="text">{{username}}</h2>
                    </div>
                    <div class="info"></div>
                </div>
                <div class="section">

                </div>
                <div class="footer"></div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters(['userCenterVisible'])
    },
    data() {
        return {
            username: '用户名'
        };
    },
    methods: {
        // 隐藏用户中心
        hide() {
            this.setUserCenterVisible(false);
        },
        ...mapMutations({
            setUserCenterVisible: 'SET_USER_CENTER_VISIBLE'
        })
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.user-center-wrapper {
    &.slide-enter-active,
    &.slide-leave-active {
        transition: opacity 0.3s;
        .user-center {
            transition: all 0.3s;
        }
    }
    &.slide-enter,
    &.slide-leave-to {
        opacity: 0;
        .user-center {
            transform: translate3d(-100%, 0, 0);
        }
    }
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    background-color: $color-background-d;
    box-shadow: 3px 0px 14px 4px rgba(0, 0, 0, 0.12);
    .user-center {
        width: 75%;
        height: 100%;
        background-color: $color-sub-theme;
        .header {
            width: 100%;
            height: 25%;
            .avatar-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                background-image: url('https://web-linux.com/img/daily_pic.png');
                background-size: cover;
                background-repeat: no-repeat;
                .avatar {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 30%;
                    left: 10%;
                }
                .text {
                    position: absolute;
                    font-size: $font-size-large-x;
                    color: $color-text-white;
                    bottom: 10%;
                    left: 10%;
                }
            }
        }
    }
}
</style>
