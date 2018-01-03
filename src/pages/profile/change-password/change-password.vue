<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="更改密码">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <p class="desc">密码长度为6-16位，数字、字母、字符至少包含两种</p>
                <mu-text-field label="原密码" labelFloat/>
                <mu-text-field label="新密码" labelFloat/>
                <mu-text-field label="重复新密码" labelFloat/>
                <mu-raised-button class="btn" label="修改" primary fullWidth/>
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
}
.desc {
    width: 120%;
    margin-left: -10%;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    color: $color-text-light;
}
.btn {
    margin-top: 10px;
}
</style>
