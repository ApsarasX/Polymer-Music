<template>
    <div class="mine">
        <scroll :data="discList" class="mine-content">
            <div>
                <mu-list class="option-list">
                    <mu-list-item title="最近收听" disableRipple @click="enterHistory">
                        <mu-icon slot="left" value="history" />
                    </mu-list-item>
                    <mu-list-item title="收藏歌曲" disableRipple @click="enterFavoriteSongs">
                        <mu-icon slot="left" value="favorite" />
                    </mu-list-item>
                </mu-list>
                <mu-sub-header class="title">收藏歌单</mu-sub-header>
                <ul class="list">
                    <li @click="selectItem(item)" v-for="(item, index) in favoriteListList" class="item" :key="index">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.image" alt="discItem">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creatorName"></h2>
                            <p class="desc" v-html="item.name"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import Scroll from '@/base/scroll/scroll';

export default {
    components: {
        Scroll
    },
    data() {
        return {
            discList: []
        };
    },
    computed: {
        ...mapGetters(['favoriteListList'])
    },
    methods: {
        enterHistory() {
            this.$router.push('/main/mine/history');
        },
        enterFavoriteSongs() {
            this.$router.push('/main/mine/favorite_song');
        },
        // 点击歌单进入详情
        selectItem(item) {
            this.$router.push(`/main/mine/favorite_sheet/${item.id}`);
            this.setDisc(item);
        },
        ...mapMutations({ setDisc: 'SET_DISC' })
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.mine {
    background-color: #f4f4f4;
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .mine-content {
        height: 100%;
        overflow: hidden;
        .option-list,
        .title {
            background-color: #fff;
        }
    }
}
.list {
    padding-top: 15px;
    .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        margin: 0 15px 10px;
        padding: 10px;
        background-color: $color-background;
        .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: $color-text-d;
            }
        }
    }
}
</style>
