<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
            <li @click="selectItem(item)" class="search-item" v-for="(item,index) in searches" :key="index">
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="material-icons">clear</i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    props: {
        searches: {
            type: Array,
            default: []
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item);
        },
        deleteOne(item) {
            this.$emit('delete', item);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    &.list-enter-active,
    &.list-leave-active {
        transition: all 0.1s;
    }
    &.list-enter,
    &.list-leave-to {
        height: 0;
    }
    .text {
        flex: 1;
        color: $color-text-l;
    }
    .icon {
        @include extend-click;
        .material-icons {
            font-size: $font-size-large-x;
            color: $color-text-l;
        }
    }
}
</style>
