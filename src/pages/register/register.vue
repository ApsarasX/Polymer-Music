<template>
    <mtransition>
        <div class="wrapper">
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
                                <mu-text-field hintText="手机号" />
                            </div>
                            <div class="validate-code">
                                <!-- <span>获取验证码</span> -->
                                <mu-flat-button label="获取验证码" primary/>
                            </div>
                        </li>
                        <li>
                            <div class="vcode-input">
                                <mu-text-field hintText="验证码" />
                            </div>
                            <div>
                                <mu-raised-button label="下一步" primary @click="nextStep" />
                            </div>
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===1">
                        <li>
                            <mu-text-field hintText="用户名" />
                        </li>
                        <li>
                            <mu-text-field hintText="密码" />
                        </li>
                        <li>
                            <mu-text-field hintText="重复密码确认" />
                        </li>
                        <li class="right">
                            <mu-raised-button label="下一步" primary @click="nextStep" />
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===2">
                        <li>
                            <mu-text-field hintText="昵称(可选)" />
                        </li>
                        <li>
                            <mu-text-field hintText="密码" />
                        </li>
                        <li>
                            <mu-text-field hintText="重复密码确认" />
                        </li>
                        <div>
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
                        </div>
                        <li class="right">
                            <mu-raised-button label="完成" primary @click="nextStep" />
                        </li>
                    </ul>
                    <ul class="form-list" v-show="activeStep===3">
                        <div class="center">
                            <mu-icon value="done" size="72" />
                            <p>所有注册步骤都已完成</p>
                        </div>
                        <mu-raised-button label="开始音乐之旅" fullWidth primary @click="toListen" />
                    </ul>
                </div>
            </div>
        </div>
    </mtransition>
</template>
<script>
import Mtransition from '@/base/mtransition/mtransition';

export default {
    data() {
        return {
            activeStep: 0
        };
    },
    components: {
        Mtransition
    },
    methods: {
        nextStep() {
            this.activeStep += 1;
        },
        back() {
            this.$router.back();
        },
        toListen() {
            this.$router.replace('/main/recommend');
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.wrapper {
    overflow: hidden;
}

.main {
    width: 100%;
    height: 90vh;
    margin: 10px auto;
    overflow-x: hidden;
    overflow-y: scroll;
    .form-group {
        width: 85%;
        margin: 10px auto;
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
