<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="个人信息">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <scroll class="content">
                <div>
                    <mu-card class="card">
                        <mu-list>
                            <mu-list-item title="注册时间">
                                <mu-icon slot="left" value="access_time" />
                                <p slot="after">2017-10-9</p>
                            </mu-list-item>
                            <mu-list-item title="用户名">
                                <mu-icon slot="left" value="person" />
                                <p slot="after">{{username}}</p>
                            </mu-list-item>
                            <mu-list-item title="昵称" @click="alterInfo('nickname')">
                                <mu-icon slot="left" value="star" />
                                <p slot="after">{{nickname}}</p>
                                <mu-icon slot="after" value="chevron_right" />
                            </mu-list-item>
                        </mu-list>
                    </mu-card>
                    <mu-card class="card">
                        <mu-list>
                            <mu-list-item title="手机" @click="alterInfo('phone')">
                                <mu-icon slot="left" value="smartphone" />
                                <p slot="after">{{mobile}}</p>
                                <mu-icon slot="after" value="chevron_right" />
                            </mu-list-item>
                            <mu-list-item title="密码" @click="alterInfo('password')">
                                <mu-icon slot="left" value="lock" />
                                <p slot="after">修改</p>
                                <mu-icon slot="after" value="chevron_right" />
                            </mu-list-item>
                        </mu-list>
                    </mu-card>
                    <mu-card class="card">
                        <mu-list>
                            <mu-list-item title="设备小尾巴" @click="alterInfo('device')">
                                <mu-icon slot="left" value="devices_other" />
                                <p slot="after">{{device}}</p>
                                <mu-icon slot="after" value="chevron_right" />
                            </mu-list-item>
                        </mu-list>
                    </mu-card>
                    <div class="card">
                        <mu-raised-button label="退出登录" labelClass="exit-btn" fullWidth color="#ff8a80" />
                    </div>
                </div>
            </scroll>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </m-transition>
</template>
<script>
import Scroll from '@/base/scroll/scroll';
import MTransition from '@/base/m-transition/m-transition';
import UA from 'ua-device';
import { mapGetters } from 'vuex';

export default {
    components: {
        MTransition,
        Scroll
    },
    computed: {
        username() {
            return this.userInfo.username ? this.userInfo.username : '未知用户名';
        },
        nickname() {
            return this.userInfo.nickname ? this.userInfo.nickname : '未知昵称';
        },
        mobile() {
            const { mobile } = this.userInfo;
            if (mobile.length !== 11) {
                return '未知手机号';
            }
            return `${mobile.slice(0, 3)}****${mobile.slice(-4)}`;
        },
        device() {
            const { userAgent } = window.navigator;
            const deviceInfo = new UA(userAgent).device;
            if (!deviceInfo.manufacturer && !deviceInfo.mode) {
                return '未识别机型(请点击修改)';
            }
            return `${deviceInfo.manufacturer
                ? deviceInfo.manufacturer
                : ''} ${deviceInfo.model ? deviceInfo.model : ''}`;
        },
        ...mapGetters(['userInfo'])
    },
    methods: {
        back() {
            this.$router.back();
        },
        alterInfo(infoName = 'nickname') {
            this.$router.push(`/profile/${infoName}`);
        }
    }
};
</script>
<style lang="scss" scoped>
.page-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2017;
    background-color: #fff;
}
.content {
    width: 100%;
    height: calc(100vh - 96px);
    position: relative;
    z-index: -1;
}
.card {
    width: 95%;
    margin: 10px auto;
    &:first-child,
    &:last-child {
        margin-top: 20px;
    }
}
</style>
<style lang="scss">
.exit-btn {
    font-size: 14px;
}
</style>
