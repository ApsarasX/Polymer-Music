<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                </div>
                <scroll class="list-content" :refreshDelay="refreshDelay" :data="sequenceList" ref="listContent">
                    <transition-group name="list" tag="ul">
                        <li ref="listItem" class="item" v-for="(item,index) in sequenceList" :key="item.id" @click="selectItem(item,index)">
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like">
                                <i class="icon-not-favorite"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="icon-delete"></i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-operate">
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
            <add-song ref="addSong"></add-song>
        </div>
    </transition>
</template>
<script>
import { mapActions } from 'vuex';
import Scroll from '@/base/scroll/scroll';
import { playMode } from '@/assets/js/config';
import Confirm from '@/base/confirm/confirm';
import { playerMixin } from '@/assets/js/mixin';
import AddSong from '../add-song/add-song';

export default {
    mixins: [playerMixin],
    data() {
        return {
            showFlag: false,
            refreshDelay: 100
        };
    },
    computed: {
        modeText() {
            const modeTexts = ['顺序播放', '单曲循环', '随机播放'];
            const modeText = modeTexts[this.mode];
            return `${modeText}${modeText !== '单曲循环'
                ? `(${this.playList.length}首)`
                : ''}`;
        }
        // ...mapGetters(['sequenceList', 'currentSong', 'playList', 'mode'])
    },
    methods: {
        show() {
            this.showFlag = true;
            // 延迟20ms刷新滚动列表
            setTimeout(() => {
                this.$refs.listContent.refresh();
                this.scrollToCurrent(this.currentSong);
            }, 20);
        },
        hide() {
            this.showFlag = false;
        },
        getCurrentIcon(item) {
            if (this.currentSong.id === item.id) {
                return 'icon-play';
            }
            return '';
        },
        // 点击播放列表里的歌曲
        selectItem(item, index) {
            if (this.mode === playMode.random) {
                /* eslint-disable no-param-reassign */
                index = this.playList.findIndex(song => song.id === item.id);
            }
            // 设置当前播放歌曲
            this.setCurrentIndex(index);
            // 设置播放状态为播放
            this.setPlayingState(true);
        },
        // 列表滚动到当前歌曲
        scrollToCurrent(current) {
            const index = this.sequenceList.findIndex(
                song => current.id === song.id
            );
            this.$refs.listContent.scrollToElement(this.$refs.listItem[index]);
        },
        deleteOne(item) {
            this.deleteSong(item);
            if (!this.playList.length) {
                this.hide();
            }
        },
        showConfirm() {
            this.$refs.confirm.show();
        },
        confirmClear() {
            this.deleteSongList();
            this.hide();
        },
        addSong() {
            this.$refs.addSong.show();
        },
        ...mapActions(['deleteSong', 'deleteSongList'])
    },
    watch: {
        // 如果歌曲变化, 则滚动列表
        currentSong(newSong, oldSong) {
            if (!this.showFlag || newSong.id === oldSong.id) {
                return;
            }
            this.scrollToCurrent(newSong);
        }
    },
    components: {
        Scroll,
        Confirm,
        AddSong
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active,
    &.list-fade-leave-active {
        transition: opacity 0.3s;
        .list-wrapper {
            transition: all 0.3s;
        }
    }
    &.list-fade-enter,
    &.list-fade-leave-to {
        opacity: 0;
        .list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }
    &.list-fade-enter,
    .list-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: $color-highlight-background;
        .list-header {
            position: relative;
            padding: 20px 30px 10px 20px;
            .title {
                display: flex;
                align-items: center;
                .icon {
                    margin-right: 10px;
                    font-size: 30px;
                    color: $color-theme-d;
                }
                .text {
                    flex: 1;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
                .clear {
                    @include extend-click;
                    .icon-clear {
                        font-size: $font-size-medium;
                        color: $color-text-d;
                    }
                }
            }
        }
        .list-content {
            max-height: 240px;
            overflow: hidden;
            .item {
                display: flex;
                align-items: center;
                height: 40px;
                padding: 0 30px 0 20px;
                overflow: hidden;
                &.list-enter-active,
                &.list-leave-active {
                    transition: all 0.1s;
                }
                &.list-enter,
                &.list-leave-to {
                    height: 0;
                }
                .current {
                    flex: 0 0 20px;
                    width: 20px;
                    font-size: $font-size-small;
                    color: $color-theme-d;
                }
                .text {
                    flex: 1;
                    @include no-wrap;
                    font-size: $font-size-medium;
                    color: $color-text-d;
                }
                .like {
                    @include extend-click;
                    margin-right: 15px;
                    font-size: $font-size-small;
                    color: $color-theme;
                    .icon-favorite {
                        color: $color-sub-theme;
                    }
                }
                .delete {
                    @include extend-click;
                    font-size: $font-size-small;
                    color: $color-theme;
                }
            }
        }
        .list-operate {
            width: 140px;
            margin: 20px auto 30px auto;
            .add {
                display: flex;
                align-items: center;
                padding: 8px 16px;
                border: 1px solid $color-text-l;
                border-radius: 100px;
                color: $color-text-l;
                .icon-add {
                    margin-right: 5px;
                    font-size: $font-size-small-s;
                }
                .text {
                    font-size: $font-size-small;
                }
            }
        }
        .list-close {
            text-align: center;
            line-height: 50px;
            background: $color-background;
            font-size: $font-size-medium-x;
            color: $color-text-l;
        }
    }
}
</style>
