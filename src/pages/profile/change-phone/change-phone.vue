<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="换绑手机号">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <p class="current">您当前的手机号{{currentPhone}}</p>
                <p class="desc">换绑手机号需要重新获取新手机号的短信验证码</p>
                <mu-text-field class="phone-input" label="手机号" labelFloat/>
                <div class="vcode-wrapper">
                    <div class="vcode-inner-wrapper">
                        <mu-text-field class="vcode-input" label="短信验证码" labelFloat/>
                    </div>
                    <mu-flat-button class="vcode-get-btn" label="获取验证码" labelClass="vcode-label" />
                </div>
                <mu-raised-button label="确认更换" primary fullWidth/>
            </div>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';

export default {
    components: {
        MTransition
    },
    data() {
        return {
            currentPhone: '132****5806'
        };
    },
    methods: {
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
    width: 80%;
    height: 75vh;
    margin: 25px auto;
    p {
        text-align: center;
        padding: 8px 0;
    }
}
.current {
    font-size: 18px;
    color: $color-text;
}
.desc {
    font-size: 14px;
    font-weight: 300;
    color: $color-text-light;
}
.phone-input {
    margin-top: 5px;
}
.vcode-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.vcode-inner-wrapper {
    flex: 3;
}
.vcode-get-btn {
    flex: 2;
}
</style>
<style lang="scss">
@import '~@/assets/scss/variable.scss';

.vcode-label {
    color: $color-theme !important;
}
</style>
