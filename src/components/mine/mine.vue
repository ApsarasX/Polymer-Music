<template>
    <div class="mine">
        <scroll :data="discList" class="mine-content">
            <div>
                <mu-list class="option-list">
                    <mu-list-item title="最近收听">
                        <mu-icon slot="left" value="history" />
                    </mu-list-item>
                    <mu-list-item title="收藏歌曲">
                        <mu-icon slot="left" value="favorite" />
                    </mu-list-item>
                </mu-list>
                <mu-sub-header class="title">收藏歌单</mu-sub-header>
                <ul class="list">
                    <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.imgurl" alt="discItem">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import { ERR_OK } from '@/api/config';
import { getDiscList } from '@/api/recommend';
import { mapMutations } from 'vuex';
import Scroll from '@/base/scroll/scroll';

export default {
    created() {
        this._getDiscList();
    },
    components: {
        Scroll
    },
    data() {
        return {
            discList: []
        };
    },
    methods: {
        // 点击歌单进入详情
        selectItem(item) {
            this.setDisc(item);
            this.$router.push({
                path: `/mine/${item.dissid}`
            });
        },
        /**
         * @private
         * @function _getDiscList - 获取歌单数据
         * */
        async _getDiscList() {
            try {
                const res = await getDiscList();
                if (res.code === ERR_OK) {
                    this.discList = res.data.list.slice(0, 2);
                }
            } catch (err) {
                throw err;
            }
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
    padding-top: 20px;
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
