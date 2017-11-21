<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <!-- 缓存DOM到内存 -->
        <!-- keep-alive尚未生效 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
// 引入基础组件
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';

export default {
    components: {
        MHeader,
        Tab
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

#app {
    color: $color-theme;
}
</style>
