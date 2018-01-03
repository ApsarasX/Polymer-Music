<template>
    <m-transition type="slide-to-staic">
        <div class="page-wrapper">
            <mu-appbar title="登录">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <ul class="form-list">
                    <li>
                        <mu-text-field v-model="username" label="用户名/手机号" labelFloat />
                    </li>
                    <li>
                        <mu-text-field v-model="password" label="密码" labelFloat />
                    </li>
                    <li>
                        <router-link to="/register" tag="a" class="option">注册账号</router-link>
                        <router-link to="" tag="a" class="option">忘记密码</router-link>
                        <mu-raised-button label="登录" @click="login" primary/>
                    </li>
                </ul>
            </div>
            <mu-dialog :open="dialog">
                <div class="logining">
                    <loading class="logining-loading"></loading>
                    <p class="logining-text">正在登陆</p>
                </div>
            </mu-dialog>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';
import Loading from '../../base/loading/loading';

export default {
    data() {
        return {
            username: '',
            password: '',
            logining: true,
            dialog: true
        };
    },
    components: {
        MTransition,
        Loading
    },
    methods: {
        login() {},
        back() {
            this.$router.back();
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.page-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2017;
    background-color: #fff;
}
.main {
    width: 100%;
    height: 75vh;
    margin-top: 25px;
}
.form-list {
    width: 80%;
    margin: 0 auto;
    li {
        display: block;
        &:last-child {
            float: right;
            padding-top: 10px;
            .option {
                margin-right: 20px;
                font-size: 14px;
                color: $color-theme;
            }
            &::after {
                content: '';
                clear: both;
            }
        }
    }
}
.logining {
    display: flex;
}
.logining-loading {
    display: inline-block !important;
    flex: 2;
}
.logining-text {
    flex: 1;
}
</style>
