<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="修正设备型号">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <p class="current">您当前的设备型号: {{device}}</p>
                <p class="desc">设备名称应和官网公布的一致</p>
                <mu-text-field class="model-input" v-model="model" label="设备型号" labelFloat/>
                <mu-raised-button label="提交" primary fullWidth/>
            </div>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';
import UA from 'ua-device';

export default {
    components: {
        MTransition
    },
    data() {
        return {
            model: ''
        };
    },
    computed: {
        device() {
            const { userAgent } = window.navigator;
            const deviceInfo = new UA(userAgent).device;
            if (!deviceInfo.manufacturer && !deviceInfo.mode) {
                return '未识别机型(请点击修改)';
            }
            return `${deviceInfo.manufacturer
                ? deviceInfo.manufacturer
                : ''} ${deviceInfo.model ? deviceInfo.model : ''}`;
        }
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
.model-input {
    margin-top: 5px;
}
</style>
