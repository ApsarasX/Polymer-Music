<template>
    <div>
        <m-header @userCenterVisibleChange="userCenterVisibleChange"></m-header>
        <tab></tab>
        <transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <player></player>
        <user-center></user-center>
        <mu-dialog :open="dialog" title="登录/注册">
            <p class="dialogText">注册并登陆后可以您的体验更好, 是否登录/注册?</p>
            <mu-flat-button label="取消" slot="actions" primary @click="close" />
            <mu-flat-button label="注册" slot="actions" primary @click="redirect('/register')" />
            <mu-flat-button label="登录" slot="actions" primary @click="redirect('/login')" />
        </mu-dialog>
    </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
import UserCenter from '@/components/user-center/user';
import { mapGetters, mapMutations } from 'vuex';
import storage from 'good-storage';

export default {
    computed: {
        ...mapGetters(['userCenterVisible', 'direction'])
    },
    components: {
        MHeader,
        Tab,
        Player,
        UserCenter
    },
    created() {
        if (!storage.get('__login_suggest__')) {
            setTimeout(() => {
                this.dialog = true;
            }, 2000);
        }
    },
    data() {
        return {
            dialog: false
        };
    },
    methods: {
        close() {
            this.dialog = false;
            storage.set('__login_suggest__', true);
        },
        redirect(path = '/login') {
            this.$router.push(path);
            storage.set('__login_suggest__', true);
        },
        userCenterVisibleChange() {
            this.setUserCenterVisible(!this.userCenterVisible);
            storage.set('__login_suggest__', true);
        },
        ...mapMutations({
            setUserCenterVisible: 'SET_USER_CENTER_VISIBLE'
        })
    }
};
</script>
<style lang="scss" scoped>
.dialogText {
    line-height: 30px;
}
.slide-out-enter-active,
.slide-out-leave-active,
.slide-in-enter-active,
.slide-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}

.slide-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
