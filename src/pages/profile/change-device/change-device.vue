<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="修正设备型号">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
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
.page-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20171228;
    background-color: #fff;
}
</style>
