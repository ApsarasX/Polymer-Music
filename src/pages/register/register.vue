<template>
    <m-transition type="slide">
        <div class="page-wrapper">
            <mu-appbar title="注册">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <mu-stepper :activeStep="activeStep">
                    <mu-step>
                        <mu-step-label>
                            验证手机号
                        </mu-step-label>
                    </mu-step>
                    <mu-step>
                        <mu-step-label>
                            创建用户
                        </mu-step-label>
                    </mu-step>
                    <mu-step>
                        <mu-step-label>
                            录入信息
                        </mu-step-label>
                    </mu-step>
                </mu-stepper>
                <div class="form-group">
                    <ul class="form-list" v-show="activeStep===0">
                        <li>
                            <div class="mobile">
                                <mu-text-field v-model="mobile" label="手机号" labelFloat />
                            </div>
                            <div class="validate-code">
                                <mu-flat-button :label="vcodeBtnLabel" :disabled="vcodeBtnLabel!=='获取验证码'" @click="sendVcode" primary/>
                            </div>
                        </li>
                        <li>
                            <div class="vcode-input">
                                <mu-text-field v-model="vcode" label="验证码" labelFloat />
                            </div>
                            <div>
                                <mu-raised-button label="下一步" primary @click="validateMobile" />
                            </div>
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===1">
                        <li>
                            <mu-text-field label="用户名" labelFloat v-model="form.username" />
                        </li>
                        <li>
                            <mu-text-field label="密码" type="password" labelFloat v-model="form.password" />
                        </li>
                        <li>
                            <mu-text-field label="重复密码确认" type="password" labelFloat v-model="form.rePassword" />
                        </li>
                        <li class="right">
                            <mu-raised-button label="下一步" primary @click="registerForm" />
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===2">
                        <li>
                            <mu-text-field label="昵称(可选)" v-model="nickname" labelFloat />
                        </li>
                        <div>
                            <mu-list>
                                <mu-sub-header>音乐来源</mu-sub-header>
                                <mu-list-item disableRipple title="网易云音乐">
                                    <mu-switch slot="right" v-model="srcTypes.ne" />
                                </mu-list-item>
                                <mu-list-item disableRipple title="QQ音乐">
                                    <mu-switch slot="right" v-model="srcTypes.qq" />
                                </mu-list-item>
                                <mu-list-item disableRipple title="虾米音乐">
                                    <mu-switch slot="right" v-model="srcTypes.xm" />
                                </mu-list-item>
                            </mu-list>
                        </div>
                        <li class="right">
                            <mu-raised-button label="完成" primary @click="supplyInfo" />
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===3">
                        <div class="center">
                            <mu-icon value="done" :size="72" />
                            <p>所有注册步骤都已完成</p>
                        </div>
                        <mu-raised-button label="开始音乐之旅" fullWidth primary @click="allComplete" />
                    </ul>
                </div>
            </div>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';
import { mapActions } from 'vuex';
import { sendVcodeReq, validateMobileReq, registerReq } from '@/api/user';
import { ERR_OK } from '@/api/config';
// 发送验证码的间隔
const VCODE_INTERVAL = 60000;

export default {
    data() {
        return {
            // 步骤索引
            activeStep: 0,
            // 手机号
            mobile: '',
            // 验证码
            vcode: '',
            // (获取验证码|计时)文本
            vcodeBtnLabel: '获取验证码',
            // 验证码计时
            countDown: 60,
            // 是否已经发送过验证码
            hasReqVcode: {
                status: false,
                mobile: '',
                lastTime: 0
            },
            // 注册表单
            form: {
                username: '',
                password: '',
                rePassword: ''
            },
            // 音乐来源
            srcTypes: {
                qq: false,
                ne: false,
                xm: false
            },
            // 昵称
            nickname: ''
        };
    },
    components: {
        MTransition
    },
    methods: {
        // 第一步 - 发送验证码
        async sendVcode() {
            if (this.activeStep !== 0) {
                return;
            }
            // 手机号不正确
            if (!this._validate(this.mobile)) {
                this.setPopup('请输入正确的手机号');
                return;
            }
            // 间隔太短
            if (Date.now() - this.hasReqVcode.lastTime < VCODE_INTERVAL) {
                this.setPopup('请求验证码频率过高, 请稍后重试');
                return;
            }
            this.hasReqVcode.status = true;
            this.hasReqVcode.mobile = this.mobile;
            // 清除计时器
            clearInterval(this.timer);
            // 发送验证码
            try {
                const res = await sendVcodeReq(this.mobile);
                if (res.code === ERR_OK) {
                    // 设置最后一次发送验证码的时间
                    this.hasReqVcode.lastTime = Date.now();
                    // 设置及计时器
                    this.timer = setInterval(() => {
                        if (this.countDown === 0) {
                            clearInterval(this.timer);
                            this.countDown = 60;
                            this.vcodeBtnLabel = '获取验证码';
                            return;
                        }
                        this.vcodeBtnLabel = `${this.countDown}s`;
                        this.countDown -= 1;
                    }, 1000);
                    setTimeout(() => {
                        this.setPopup('验证码已发送, 请查收');
                    }, 1000);
                } else {
                    this.setPopup('验证码发送失败, 请稍后重试');
                }
            } catch (err) {
                console.error(err);
                this.setPopup('验证码发送失败, 请稍后重试');
            }
        },
        // 第二步 - 根据输入的验证码校验手机号, 并决定是否nextStep
        async validateMobile() {
            if (this.activeStep !== 0) {
                return;
            }
            if (!this._validate(this.mobile)) {
                this.setPopup('请输入正确的手机号');
                return;
            }
            if (!this.hasReqVcode.status) {
                this.setPopup('您尚未请求过验证码');
                return;
            }
            if (this.hasReqVcode.mobile !== this.mobile) {
                this.setPopup('输入的手机号与接收验证码的手机号不匹配');
                return;
            }
            if (!this._validate(this.vcode, 'vcode')) {
                this.setPopup('验证码格式错误');
                return;
            }
            try {
                const res = await validateMobileReq({
                    mobile: this.mobile,
                    vcode: this.vcode
                });
                if (res.code === ERR_OK) {
                    this._nextStep();
                } else {
                    this.setPopup('验证码不匹配');
                }
            } catch (err) {
                console.error(err);
                this.setPopup('验证码匹配失败, 请稍后重试');
            }
        },
        // 第三步 - 注册用户名和密码
        async registerForm() {
            if (this.activeStep !== 1) {
                return;
            }
            if (!this._validate(this.form.username, 'username')) {
                this.setPopup('用户名不合法');
                return;
            }
            if (this.form.password !== this.form.rePassword) {
                this.setPopup('两次输入密码不一致');
                return;
            }
            if (!this._validate(this.form.password, 'password')) {
                this.setPopup('密码不合法');
                return;
            }
            try {
                const res = await registerReq({
                    username: this.form.username,
                    password: this.form.password,
                    repassword: this.form.rePassword
                });
                if (res.code === ERR_OK) {
                    this.setHasLogin(true);
                    this.setUserInfo({
                        username: this.form.username,
                        mobile: this.hasReqVcode.mobile || this.mobile
                    });
                    this._nextStep();
                } else {
                    this.setPopup(res.data.err_desc || '服务器内部错误');
                }
            } catch (err) {
                console.error(err);
                this.setPopup('注册失败请稍后重试');
            }
        },
        // 第四步 - 补充昵称和音乐来源信息
        supplyInfo() {
            if (this.nickname) {
                this.setUserInfo({
                    nickname: this.nickname
                });
            }
            this.setSrcTypes({
                qq: this.srcTypes.qq,
                ne: this.srcTypes.ne,
                xm: this.srcTypes.xm
            });
            this._nextStep();
        },
        // 返回
        back() {
            this.$router.back();
        },
        // 完成所有步骤,开始听歌
        allComplete() {
            this.$router.replace('/main/recommend');
        },
        // 校验输入
        _validate(str, type = 'mobile') {
            const reg = {
                // 11位手机号
                mobile: /^1(3|4|5|6|7|8)\d{9}$/,
                // 4位验证码
                vcode: /^\d{4}$/,
                // 16位以内用户名
                username: /^[a-zA-Z_]\w{0,15}$/,
                // 16位以内密码
                password: /^.{1,16}$/
            };
            return reg[type].test(str);
        },
        // 下一步
        _nextStep() {
            this.activeStep += 1;
        },
        ...mapActions([
            'setPopup',
            'setSrcTypes',
            'setHasLogin',
            'setHasLogin',
            'setUserInfo'
        ])
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
    height: 90vh;
    margin: 10px auto;
    overflow-x: hidden;
    overflow-y: scroll;
    .form-group {
        width: 85%;
        margin: 0 auto;
        li {
            padding: 10px 0;
            display: block;
            div {
                display: inline-block;
            }
        }
    }
}

.mobile {
    width: 60%;
}
.validate-code {
    width: 38%;
    text-align: center;
    color: $color-theme;
    &.disable {
        color: $color-text;
    }
}
.vcode-input {
    width: 60%;
    & + div {
        width: 38%;
        text-align: center;
    }
}
.right {
    float: right;
    &::after {
        content: '';
        clear: both;
    }
}
.center {
    width: 100%;
    text-align: center;
    margin: 20px auto;
    p {
        color: $color-text;
    }
}
</style>
