<template>
    <div id="app">
        <m-header @userCenterVisibleChange="userCenterVisibleChange"></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
        <user-center></user-center>
    </div>
</template>

<script>
// 引入基础组件
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';
import Player from './components/player/player';
import UserCenter from './components/user-center/user';
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters(['userCenterVisible'])
    },
    components: {
        MHeader,
        Tab,
        Player,
        UserCenter
    },
    methods: {
        userCenterVisibleChange() {
            this.setUserCenterVisible(!this.userCenterVisible);
        },
        ...mapMutations({
            setUserCenterVisible: 'SET_USER_CENTER_VISIBLE'
        })
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

#app {
    color: $color-theme;
}
</style>
