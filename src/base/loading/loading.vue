<template>
    <div class="loading">
        <div class="lds-rolling">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.loading {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    @keyframes lds-rolling {
        0% {
            -webkit-transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
            transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
        }
        100% {
            -webkit-transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
            transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
        }
    }
    @-webkit-keyframes lds-rolling {
        0% {
            -webkit-transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
            transform: translate3d(-50%, -50%, 0) rotateZ(0deg);
        }
        100% {
            -webkit-transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
            transform: translate3d(-50%, -50%, 0) rotateZ(360deg);
        }
    }
    .lds-rolling {
        position: relative;
    }
    .lds-rolling div,
    .lds-rolling div:after {
        position: absolute;
        width: 156px;
        height: 156px;
        border: 16px solid $color-theme;
        border-top-color: transparent;
        border-radius: 50%;
    }
    .lds-rolling div {
        -webkit-animation: lds-rolling 1s linear infinite;
        animation: lds-rolling 1s linear infinite;
        top: 100px;
        left: 100px;
    }
    .lds-rolling div:after {
        -webkit-transform: rotateZ(90deg);
        transform: rotateZ(90deg);
    }
    .lds-rolling {
        width: 36px !important;
        height: 36px !important;
        -webkit-transform: translate3d(-18px, -18px, 0) scale(0.18)
            translate3d(18px, 18px, 0);
        transform: translate3d(-18px, -18px, 0) scale(0.18) translate3d(18px, 18px, 0);
    }
}
</style>
