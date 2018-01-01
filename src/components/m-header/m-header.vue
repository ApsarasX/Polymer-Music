<template>
    <div class="m-header">
        <div class="user" @click.stop="toggleUserCenter">
            <mu-icon-button>
                <i class="material-icons">menu</i>
            </mu-icon-button>
        </div>
        <h1 class="text">聚合音乐</h1>
        <router-link to="/main/search" class="search" tag="div">
            <mu-icon-button>
                <i class="material-icons">search</i>
            </mu-icon-button>
        </router-link>
    </div>
</template>

<script>
export default {
    methods: {
        toggleUserCenter() {
            this.$emit('userCenterVisibleChange');
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.m-header {
    // position: fixed;
    // left: 0;
    // right: 0;
    height: 44px;
    text-align: center;
    color: $color-text-white;
    font-size: 0;
    background-color: $color-theme-background;
    .text {
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: $font-size-large;
    }

    .search {
        position: absolute;
        top: 0;
        right: 0;
    }
    .user {
        position: absolute;
        top: 0;
        left: 0;
    }
    .material-icons {
        font-size: 28px;
        color: $color-sub-theme;
    }
}
</style>
