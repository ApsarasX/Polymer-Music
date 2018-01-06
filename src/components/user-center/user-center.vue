<template>
    <transition name="slide">
        <div class="user-center-wrapper" @click="hide" v-show="userCenterVisible">
            <div @click.stop>
                <mu-drawer class="user-center" :open="true" :docked="true" @close="hide">
                    <mu-card class="user-center-inner">
                        <mu-card-media>
                            <img src="https://web-linux.com/img/daily_pic.png" />
                            <div class="mu-card-media-title" @click.stop="enterProfile">
                                <div class="mu-card-title">
                                    {{hasLogin?userInfo.nickname:'[请登录]'}}
                                </div>
                            </div>
                        </mu-card-media>
                        <mu-list>
                            <mu-sub-header>音乐来源</mu-sub-header>
                            <mu-list-item disableRipple title="网易云音乐">
                                <mu-switch slot="right" v-model="_srcTypes.ne" @input="srcTypesChange" />
                            </mu-list-item>
                            <mu-list-item disableRipple title="QQ音乐">
                                <mu-switch slot="right" v-model="_srcTypes.qq" @input="srcTypesChange" />
                            </mu-list-item>
                            <mu-list-item disableRipple title="虾米音乐">
                                <mu-switch slot="right" v-model="_srcTypes.xm" @input="srcTypesChange" />
                            </mu-list-item>
                        </mu-list>
                        <mu-divider />
                        <mu-list>
                            <mu-list-item title="反馈建议" @click="openFeedDialog" />
                            <mu-dialog :open="showFeedDialog" title="反馈建议">
                                <mu-text-field :hintText="`最多${feedTextMaxLen}个字符(超出部分不会被发送)`" v-model.trim="feedText" @textOverflow="cutFeddback" multiLine :rows="3" :rowsMax="6" :maxLength="feedTextMaxLen" />
                                <mu-flat-button slot="actions" primary @click="closeFeedDialog(false)" label="取消" />
                                <mu-flat-button slot="actions" primary @click="closeFeedDialog(true)" label="发送" />
                            </mu-dialog>
                            <mu-list-item title="清除缓存" @click="clearStorage" />
                            <mu-list-item title="刷新" @click="refreshPage" />
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
                                        <p slot="after">{{authorName}}</p>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    props: {
        feedTextMaxLen: {
            type: Number,
            default: 100
        }
    },
    created() {
        // 初始化音乐来源类型
        const { qq, ne, xm } = this.srcTypes;
        this._srcTypes = { qq, ne, xm };
    },
    computed: {
        ...mapGetters(['userCenterVisible', 'srcTypes', 'hasLogin', 'userInfo'])
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
            showAboutDialog: false,
            showFeedDialog: false,
            softwareName,
            version,
            authorName: author.name,
            repository
        };
    },
    methods: {
        // 隐藏用户中心
        hide() {
            this.setUserCenterVisible(false);
        },
        enterProfile() {
            if (this.hasLogin) {
                this.$router.push('/profile');
            } else {
                this.$router.push('/login');
            }
        },
        srcTypesChange() {
            this.setSrcTypes({ ...this._srcTypes });
        },
        // 打开关于对话框
        openAboutDialog() {
            this.showAboutDialog = true;
        },
        // 打开反馈对话框
        openFeedDialog() {
            this.showFeedDialog = true;
        },
        // 关闭关于对话框
        closeAboutDialog() {
            this.showAboutDialog = false;
        },
        // 关闭反馈对话框
        closeFeedDialog(isSend) {
            this.showFeedDialog = false;
            if (this.feedText) {
                if (isSend) {
                    // 在此处发送反馈
                    console.info(this.feedText, isSend);
                }
                this.feedText = '';
            }
        },
        cutFeddback(isOverflow) {
            if (isOverflow) {
                this.feedText = this.feedText.slice(0, this.feedTextMaxLen);
            }
        },
        clearStorage() {
            localStorage.clear();
            sessionStorage.clear();
            this.setPopup('清除缓存成功');
        },
        // 强制刷新页面
        refreshPage() {
            window.location.reload();
        },
        ...mapMutations({
            setUserCenterVisible: 'SET_USER_CENTER_VISIBLE'
        }),
        ...mapActions(['setPopup', 'setSrcTypes'])
    },
    watch: {
        userCenterVisible(newVisible) {
            if (!newVisible) {
                this.closeAboutDialog();
                this.closeFeedDialog();
            }
        }
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
    z-index: 220;
    width: 100%;
    background-color: $color-background-d;
    box-shadow: 3px 0px 14px 4px rgba(0, 0, 0, 0.12);
}
.user-center {
    width: 75%;
    height: 100%;
}
.user-center-inner {
    box-shadow: none;
}
</style>
