<template>
    <div class="m-header">
        <!-- <div class="icon"></div> -->
        <h1 class="text">聚合音乐</h1>
        <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.m-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-text-white;
    font-size: 0;
    background-color: $color-theme-background;
    .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        margin-right: 9px;
        @include bg-image('logo');
        background-size: 30px 32px;
    }

    .text {
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: $font-size-large;
    }

    .mine {
        position: absolute;
        top: 0;
        right: 0;
        .icon-mine {
            display: block;
            padding: 12px;
            font-size: 20px;
            color: $color-theme;
        }
    }
}
</style>
