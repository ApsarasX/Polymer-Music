<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="个人信息">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="content">
                <mu-card class="card">
                    <mu-list>
                        <mu-list-item title="注册时间">
                            <mu-icon slot="left" value="access_time" />
                            <p slot="after">2017-10-9</p>
                        </mu-list-item>
                        <mu-list-item title="用户名">
                            <mu-icon slot="left" value="person" />
                            <p slot="after">pyyzcwg2833</p>
                        </mu-list-item>
                        <mu-list-item title="昵称" @click="alterInfo('nickname')">
                            <mu-icon slot="left" value="star" />
                            <p slot="after">风硕依源</p>
                            <mu-icon slot="after" value="chevron_right" />
                        </mu-list-item>
                    </mu-list>
                </mu-card>
                <mu-card class="card">
                    <mu-list>
                        <mu-list-item title="手机" @click="alterInfo('phone')">
                            <mu-icon slot="left" value="smartphone" />
                            <p slot="after">132****5806</p>
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
                        <mu-list-item title="设备" @click="alterInfo('device')">
                            <mu-icon slot="left" value="devices_other" />
                            <p slot="after">iPhone</p>
                            <mu-icon slot="after" value="chevron_right" />
                        </mu-list-item>
                    </mu-list>
                </mu-card>
                <div class="card">
                    <mu-raised-button label="退出登录" labelClass="exit-btn" fullWidth color="#ff8a80" />
                </div>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';

export default {
    components: {
        MTransition
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
    z-index: 20171228;
    background-color: #fff;
}
.content {
    width: 100%;
    height: calc(100vh - 56px);
    .card {
        width: 95%;
        margin: 10px auto;
        &:first-child,
        &:last-child {
            margin-top: 20px;
        }
    }
}
</style>
<style lang="scss">
.exit-btn {
    font-size: 14px;
}
</style>
