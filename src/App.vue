<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="popupVisible">
            {{popupContent}}
        </mu-popup>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['popupVisible', 'popupContent'])
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
#app {
    color: $color-theme;
    overflow: hidden;
}
</style>
