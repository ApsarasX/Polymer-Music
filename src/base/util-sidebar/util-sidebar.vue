<template>
    <mu-drawer :open="drawerOpen" :docked="false" @close="close" :width="180">
        <mu-list>
            <mu-sub-header>页面</mu-sub-header>
            <router-link to="/main/recommend" tag="div">
                <mu-list-item title="主页" titleClass="item-title"></mu-list-item>
            </router-link>
            <router-link to="/login" tag="div">
                <mu-list-item title="登录" titleClass="item-title"></mu-list-item>
            </router-link>
            <router-link to="/register" tag="div">
                <mu-list-item title="注册" titleClass="item-title"></mu-list-item>
            </router-link>
            <mu-divider />
            <mu-sub-header>功能</mu-sub-header>
            <mu-list-item title="清除缓存" titleClass="item-title" @click="clearStorage"></mu-list-item>
            <mu-list-item title="关闭" titleClass="item-title" @click="close"></mu-list-item>
        </mu-list>
    </mu-drawer>
</template>
<script>
import storage from 'good-storage';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            drawerOpen: false
        };
    },
    methods: {
        open() {
            this.drawerOpen = true;
        },
        close() {
            this.drawerOpen = false;
        },
        clearStorage() {
            storage.clear();
            storage.session.clear();
            this.setPopup('清除缓存成功');
        },
        ...mapActions(['setPopup'])
    }
};
</script>
<style lang="scss">
.item-title {
    padding-left: 25%;
}
</style>
