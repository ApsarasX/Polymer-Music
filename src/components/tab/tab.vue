<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/main/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/rank">
            <span class="tab-link">排行
            </span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/main/mine">
            <span class="tab-link">我的</span>
        </router-link>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable';

.tab {
    // position: fixed;
    // top: 44px;
    // left: 0;
    // right: 0;
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    background-color: $color-theme-background;
}
.tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
        padding-bottom: 5px;
        color: $color-sub-theme;
    }

    &.router-link-active {
        .tab-link {
            color: $color-text-white;
            border-bottom: 2px solid $color-text-white;
        }
    }
}
</style>
