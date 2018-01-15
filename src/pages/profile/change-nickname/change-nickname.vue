<template>
    <m-transition>
        <div class="page-wrapper">
            <mu-appbar title="更改昵称">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <div class="main">
                <mu-text-field label="请输入昵称" labelFloat v-model="nickname" />
                <p class="desc">12个字符以内，仅支持汉字、字母、数字或下划线</p>
                <mu-raised-button label="保存" primary fullWidth @click="changeNickname" />
            </div>
        </div>
    </m-transition>
</template>
<script>
import MTransition from '@/base/m-transition/m-transition';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        MTransition
    },
    created() {
        // 不得不这样, 因为data在computed之前执行
        this.$nextTick(() => {
            if (this.userInfo.nickname) {
                this.nickname = this.userInfo.nickname;
            }
        });
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    data() {
        return {
            nickname: '未知昵称'
        };
    },
    methods: {
        changeNickname() {
            this.setUserInfo({
                nickname: this.nickname
            });
            this.setPopup('修改成功');
            setTimeout(() => {
                this.back();
            }, 1550);
        },
        back() {
            this.$router.back();
        },
        ...mapActions(['setUserInfo', 'setPopup'])
    }
};
</script>
<style lang="scss" scoped>
.page-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2017;
    background-color: #fff;
}
.main {
    width: 80%;
    height: 75vh;
    margin: 25px auto;
    .desc {
        font-size: 12px;
        font-weight: 300;
        padding: 5px 0 20px;
        color: #a9a9a9;
    }
}
</style>
