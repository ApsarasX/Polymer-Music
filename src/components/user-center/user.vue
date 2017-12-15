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
                            <mu-list-item title="反馈建议" @click="openFeedDialog"/>
                            <mu-dialog :open="showFeedDialog" title="反馈建议">
                                 <mu-text-field hintText="最多100个字符"  v-model.trim="feedText" multiLine :rows="3" :rowsMax="6" :maxLength="100"/>
                                 <mu-flat-button slot="actions"  primary @click="closeFeedDialog" label="取消"/>
                                 <mu-flat-button slot="actions" primary @click="closeFeedDialog(true)" label="发送"/>
                            </mu-dialog>
                            <mu-list-item title="关于" @click="openAboutDialog" />
                            <mu-dialog :open="showAboutDialog" title="关于" @close="closeAboutDialog">
                                <mu-list>
                                    <mu-list-item title="软件名称">
                                        <p slot="after">{{softwareName}}</p>
                                    </mu-list-item>
                                    <mu-list-item title="版本">
                                        <p slot="after">{{version}}</p>
                                    </mu-list-item>
                                    <mu-list-item title="作者" href="https://github.com/pyyzcwg2833">
                                        <p slot="after">{{author}}</p>
                                    </mu-list-item>
                                    <mu-list-item title="项目地址" :href="repository.url">
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
        /* eslint-disable global-require */
        const {
            author,
            cnName: softwareName,
            version,
            repository
        } = require('../../../package.json');
        return {
            // 反馈内容
            feedText: '',
            username: '用户名',
            showAboutDialog: false,
            showFeedDialog: false,
            softwareName,
            version,
            author,
            repository
        };
    },
    methods: {
        // 隐藏用户中心
        hide() {
            this.setUserCenterVisible(false);
        },
        // 打开对话框
        openAboutDialog() {
            this.showAboutDialog = true;
        },
        openFeedDialog() {
            this.showFeedDialog = true;
        },
        // 关闭对话框
        closeAboutDialog() {
            this.showAboutDialog = false;
        },
        /**
         * @param {Boolean} hasContent 反馈输入框是否有内容
         */
        closeFeedDialog(hasContent = false) {
            this.showFeedDialog = false;
            if (hasContent && this.feedText) {
                console.info(this.feedText);
            }
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
        .user-center-inner {
            box-shadow: none;
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
