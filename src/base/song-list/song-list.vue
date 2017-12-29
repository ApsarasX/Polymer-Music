<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song,index)" v-for="(song,index) in songs" :key="index" class="item">
                <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 格式化显示歌曲描述(歌手 - 专辑)
        getDesc(song) {
            return `${song.singer} - ${song.album}`;
        },
        // 点击歌曲, 向父组件派发事件
        selectItem(item, index) {
            this.$emit('select', item, index);
        },
        getRankCls(index) {
            if (index < 3) {
                return `icon icon${index}`;
            }
            return 'text';
        },
        getRankText(index) {
            if (index >= 3) {
                return index + 1;
            }
            return '';
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 72px;
    font-size: $font-size-medium;
    background-color: $color-background;
    margin-bottom: 10px;
    padding: 30px 20px;
}
.rank {
    flex: 0 0 25px;
    width: 25px;
    margin-right: 30px;
    text-align: center;
    .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
            @include bg-image('first');
        }
        &.icon1 {
            @include bg-image('second');
        }
        &.icon2 {
            @include bg-image('third');
        }
    }
    .text {
        color: $color-text;
        font-size: $font-size-large;
    }
}
.content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
        @include no-wrap;
        color: $color-text;
    }
    .desc {
        @include no-wrap;
        margin-top: 4px;
        color: $color-text-d;
    }
}
</style>
