<template>
    <transition :name="type">
        <slot></slot>
    </transition>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'slide'
        }
    }
};
</script>

<style scoped>
.static-enter-active,
.static-leave-active,
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
.static-enter {
    transform: translate3d(0, 0, 0);
}
.static-leave-to {
    transform: translate3d(0, 0, 0);
}
</style>
