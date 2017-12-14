<template>
    <transition name="slide">
        <div class="user-center-wrapper" @click="hide" v-show="userCenterVisible">
            <div @click.stop>
                <mu-drawer class="user-center" :open="true" :docked="true" @close="hide">
                    <mu-card class="user-center-inner">
                        <mu-card-header>
                            <div class="username-wrapper">
                                <mu-avatar src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=144480181,2572619715&fm=27&gp=0.jpg" slot="avatar" />
                                <p class="username">用户名</p>
                            </div>
                        </mu-card-header>
                        <mu-card-media>
                            <img src="https://web-linux.com/img/daily_pic.png" />
                        </mu-card-media>
                        <mu-list>
                            <mu-sub-header>音乐来源</mu-sub-header>
                            <mu-list-item disableRipple title="网易云音乐">
                                <mu-switch slot="right" />
                            </mu-list-item>
                            <mu-list-item disableRipple title="QQ音乐">
                                <mu-switch slot="right" />
                            </mu-list-item>
                            <mu-list-item disableRipple title="虾米音乐">
                                <mu-switch slot="right" />
                            </mu-list-item>
                        </mu-list>
                        <mu-divider />
                        <mu-list>
                            <mu-list-item title="反馈建议" />
                            <mu-list-item title="关于" @click="openDialog" />
                            <mu-dialog :open="showDialog" title="关于" @close="closeDialog">
                                <mu-list>
                                    <mu-list-item title="软件名称">
                                        <p slot="after">聚合音乐</p>
                                    </mu-list-item>
                                    <mu-list-item title="版本">
                                        <p slot="after">{{version}}</p>
                                    </mu-list-item>
                                    <mu-list-item title="作者" href="https://github.com/pyyzcwg2833">
                                       <p slot="after">{{author}}</p>
                                    </mu-list-item>
                                    <mu-list-item title="项目地址" href="https://github.com/pyyzcwg2833/gg-music">
                                        <p slot="after">
                                            <img src="~@/assets/image/github.svg" alt="github" width="40">
                                        </p>
                                    </mu-list-item>
                                </mu-list>
                            </mu-dialog>
                        </mu-list>
                    </mu-card>
                </mu-drawer>
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
            username: '用户名',
            showDialog: false,
            /* eslint-disable global-require */
            version: require('../../../package.json').version,
            author: require('../../../package.json').author
        };
    },
    methods: {
        // 隐藏用户中心
        hide() {
            this.setUserCenterVisible(false);
        },
        // 打开对话框
        openDialog() {
            this.showDialog = true;
        },
        // 关闭对话框
        closeDialog() {
            this.showDialog = false;
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
        .user-center-inner {
            height: 100%;
            .username-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .username {
                    flex: 1;
                    font-size: 18px;
                    color: $color-text;
                }
            }
        }
    }
}
</style>
