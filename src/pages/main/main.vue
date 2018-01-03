<template>
    <m-transition type="static">
        <div>
            <m-header @userCenterVisibleChange="userCenterVisibleChange"></m-header>
            <tab></tab>
            <div class="main-body">
                <transition :name="`slide-${direction === 'forward' ? 'in' : 'out'}`">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
            <component :is="playerComponent"></component>
            <component :is="userCenterComponent"></component>
            <mu-dialog :open="dialog" title="登录/注册">
                <p class="dialogText">注册并登陆后可以您的体验更好, 是否登录/注册?</p>
                <!-- <div> -->
                    <mu-flat-button label="取消" slot="actions" primary @click="close" />
                    <mu-flat-button label="注册" slot="actions" primary @click="redirect('/register')" />
                    <mu-flat-button label="登录" slot="actions" primary @click="redirect('/login')" />
                <!-- </div> -->
            </mu-dialog>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';
import MHeader from '@/components/m-header/m-header';
import Tab from '@/components/tab/tab';
import { mapGetters, mapMutations } from 'vuex';
import storage from 'good-storage';

export default {
    computed: {
        ...mapGetters(['userCenterVisible', 'direction'])
    },
    components: {
        MHeader,
        Tab,
        MTransition
    },
    mounted() {
        this.$nextTick(() => {
            const Player = () => import('@/components/player/player');
            const UserCenter = () =>
                import('@/components/user-center/user-center');
            this.userCenterComponent = UserCenter;
            this.playerComponent = Player;
            if (!storage.get('__login_suggest__')) {
                setTimeout(() => {
                    this.dialog = true;
                }, 2000);
            }
        });
    },
    data() {
        return {
            dialog: false,
            userCenterComponent: null,
            playerComponent: null
        };
    },
    methods: {
        close() {
            this.dialog = false;
            storage.set('__login_suggest__', true);
        },
        redirect(path = '/login') {
            this.close();
            this.$router.push(path);
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
.main-body {
    height: calc(100vh - 88px);
    // position: fixed;
    // width:100%;
    // top: 88px;
    // bottom: 0;
}
.dialogText {
    line-height: 30px;
}
.slide-out-enter-active,
.slide-out-leave-active,
.slide-in-enter-active,
.slide-in-leave-active {
    will-change: transform;
    transition: all 0.3s;
    backface-visibility: hidden;
    perspective: 1000;
}

.slide-in-enter,
.slide-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-out-enter,
.slide-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
