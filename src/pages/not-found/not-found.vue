<template>
    <div class="wrapper">
        <mu-appbar title="404 - Not Found">
            <mu-icon-button icon="menu" slot="left" @click="openDrawer" />
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
        <util-sidebar ref="sidebar"></util-sidebar>
    </div>
</template>
<script>
import UtilSidebar from '@/base/util-sidebar/util-sidebar';

export default {
    components: {
        UtilSidebar
    },
    methods: {
        openDrawer() {
            this.$refs.sidebar.open();
        },
        back() {
            this.$router.back();
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.wrapper {
    width: 100%;
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
