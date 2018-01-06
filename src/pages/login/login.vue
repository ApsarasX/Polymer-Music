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
                        <mu-text-field v-model="password" type="password" label="密码" labelFloat />
                    </li>
                    <li>
                        <router-link to="/register" tag="a" class="option">注册账号</router-link>
                        <router-link to="" tag="a" class="option">忘记密码</router-link>
                        <mu-raised-button label="登录" @click="login" primary/>
                    </li>
                </ul>
            </div>
            <mu-dialog :open="logining">
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
import { login as loginReq } from '../../api/user';
import { mapActions, mapMutations } from 'vuex';
import { ERR_OK } from '@/api/config';
import { saveLoginStatus, saveUserInfo } from '@/assets/js/cache';

const REG = {
    isMobile: /^1(3|4|5|6|7|8)\d{9}$/,
    isUsername: /^[a-z_]\w{0,15}$/,
    isPassword: /^.{1,16}$/
};

export default {
    data() {
        return {
            username: '',
            password: '',
            logining: false
        };
    },
    components: {
        MTransition,
        Loading
    },
    methods: {
        async login() {
            if (this._loginCheck()) {
                this.logining = true;
                try {
                    // 请求登录
                    const res = await loginReq({
                        username: this.username,
                        password: this.password
                    });
                    // 登陆成功
                    if (res.code === ERR_OK) {
                        const { username, nickname, mobile } = res.data;
                        // 保存登录状态和信息
                        saveLoginStatus();
                        saveUserInfo({ username, nickname, mobile });
                        this.setHasLogin(true);
                        this.setUserInfo({ username, nickname, mobile });
                        this.$router.replace('/');
                    }
                } catch (err) {
                    this.setPopup('登录失败');
                    console.error(err);
                } finally {
                    this.logining = false;
                }
            }
        },
        // 检查输入的登录信息
        _loginCheck() {
            if (
                !REG.isUsername.test(this.username) &&
                !REG.isMobile.test(this.username)
            ) {
                this.setPopup('不是合法的用户名/手机号');
                return false;
            } else if (!REG.isPassword.test(this.password)) {
                this.setPopup('密码长度应为1-16位');
                return false;
            }
            return true;
        },
        back() {
            this.$router.back();
        },
        ...mapActions(['setPopup']),
        ...mapMutations({
            setHasLogin: 'SET_HAS_LOGIN',
            setUserInfo: 'SET_USER_INFO'
        })
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
    align-items: center;
}
.logining-loading {
    flex: 0.5 0.5 15%;
    padding-top: 0 !important;
}
.logining-text {
    flex: 1;
}
</style>
