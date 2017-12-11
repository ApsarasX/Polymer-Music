<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '正在载入...'
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.loading {
    width: 100%;
    text-align: center;
    padding-top: 10px;
    .desc {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
    }
}
</style>
