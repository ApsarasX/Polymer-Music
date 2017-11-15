<template>
    <div id="app">
        <m-header></m-header>
        <tab></tab>
        <router-view></router-view>
    </div>
</template>

<script>
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
