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

<style lang="scss" scoped>
/*
 * slide: 进入时从右边滑入, 退出从右边滑出
 * slide-left: 进入时从左边滑入, 退出从左边滑出
 * static: 进入退出都是静止不动, 直接被覆盖
 * slide-to-static: 进入时从右边滑入, 退出时静止不动(直接被覆盖)
 * slide-left-to-static: 进入时从左边滑入, 退出时静止不动(直接被覆盖)
 * static-to-slide: 进入时直接覆盖之前页面, 退出时从右边滑出
 * static-to-slide-left: 进入时直接覆盖之前页面, 退出时从左边滑出
 * cross: 进入时从右边滑入, 退出时从左边滑出
 * cross-reverse: 进入时从左边滑入, 退出时从右边滑出
*/
.slide-enter-active,
.slide-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.static-enter-active,
.static-leave-active,
.slide-to-staic-enter-active,
.slide-to-staic-leave-active,
.slide-left-to-staic-enter-active,
.slide-left-to-staic-leave-active,
.static-to-slide-enter-active,
.static-to-slide-leave-active,
.static-to-slide-left-enter-active,
.static-to-slide-left-leave-active,
.cross-enter-active,
.cross-leave-active,
.cross-reverse-enter-active,
.cross-reverse-leave-active {
    will-change: transform;
    transition: all .3s;
}
// // slide
// .slide-enter,
// .slide-leave-to {
//     transform: translate3d(100%, 0, 0);
// }
// // slide-left
// .slide-left-enter,
// .slide-left-leave-to {
//     transform: translate3d(-100%, 0, 0);
// }
// // static
// .static-enter,
// .static-leave-to {
//     transform: translate3d(0, 0, 0);
// }
// // slide-to-staic
// .slide-to-staic-enter {
//     transform: translate3d(100%, 0, 0);
// }
// .slide-to-staic-leave-to {
//     transform: translate3d(0, 0, 0);
// }
// // slide-left-to-staic
// .slide-left-to-staic-enter {
//     transform: translate3d(-100%, 0, 0);
// }
// .slide-left-to-staic-leave-to {
//     transform: translate3d(0, 0, 0);
// }
// // static-to-slide
// .static-to-slide-enter {
//     transform: translate3d(0, 0, 0);
// }
// .static-to-slide-leave-to {
//     transform: translate3d(100%, 0, 0);
// }
// // static-to-slide-left
// .static-to-slide-left-enter {
//     transform: translate3d(0, 0, 0);
// }
// .static-to-slide-left-leave-to {
//     transform: translate3d(-100%, 0, 0);
// }
// // cross
// .cross-enter {
//     transform: translate3d(100%, 0, 0);
// }
// .cross-leave-to {
//     transform: translate3d(-100%, 0, 0);
// }
// // cross-reverse
// .cross-reverse-enter {
//     transform: translate3d(-100%, 0, 0);
// }
// .cross-reverse-leave-to {
//     transform: translate3d(100%, 0, 0);
// }


// 压缩版(Compressed)
.slide-enter,
.slide-leave-to,
.slide-to-staic-enter,
.static-to-slide-leave-to,
.cross-enter,
.cross-reverse-leave-to {
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter,
.slide-left-leave-to,
.slide-left-to-staic-enter,
.static-to-slide-left-leave-to,
.cross-leave-to,
.cross-reverse-enter {
    transform: translate3d(-100%, 0, 0);
}
// static
.static-enter,
.static-leave-to,
.slide-to-staic-leave-to,
.slide-left-to-staic-leave-to,
.static-to-slide-enter,
.static-to-slide-left-enter {
    transform: translate3d(0, 0, 0);
}
</style>
