<template>
    <div class="wrapper">
        <mu-appbar title="404 - Not Found">
            <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
        </mu-appbar>
        <div class="content">
            <p>您想找的页面不存在啊......</p>
        </div>
        <div class="actions">
            <router-link to="/main/recommend" tag="div">
                <mu-raised-button label="返回主页" primary/>
            </router-link>
            <mu-raised-button label="返回上一页" @click="back" primary/>
        </div>
        <mu-drawer :open="drawerOpen" :docked="false" @close="toggleDrawer" :width="180">
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
                <mu-list-item title="关闭" titleClass="item-title" @click="toggleDrawer"></mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
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
        toggleDrawer() {
            this.drawerOpen = !this.drawerOpen;
        },
        clearStorage() {
            storage.clear();
            storage.session.clear();
            this.setPopup('清除缓存成功');
        },
        back() {
            this.$router.back();
        },
        ...mapActions(['setPopup'])
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.wrapper {
    width: 100vw;
    height: 100vh;
    background-color: $color-background;
}
.content {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-size: 24px;
        color: $color-text;
        height: 24px;
        line-height: 24px;
    }
}
.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
<style lang="scss">
.item-title {
    padding-left: 25%;
}
</style>
