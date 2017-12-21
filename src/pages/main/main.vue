<template>
    <div>
        <m-header @userCenterVisibleChange="userCenterVisibleChange"></m-header>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
        <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="popupVisible">
            {{popupContent}}
        </mu-popup>
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
        ...mapGetters(['userCenterVisible', 'popupVisible', 'popupContent'])
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
</style>
