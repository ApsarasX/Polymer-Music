<template>
    <transition name="list-fade">
        <div class="playlist" v-show="playListVisible" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon material-icons" @click="changeMode">{{iconMode}}</i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear" @click="showConfirm=true">
                            <!-- <i class="icon-clear"></i> -->
                            <i class="material-icons">delete</i>
                        </span>
                    </h1>
                </div>
                <scroll class="list-content" :refreshDelay="refreshDelay" :data="sequenceList" ref="listContent">
                    <transition-group name="list" tag="ul" ref="list">
                        <li ref="listItem" class="item" v-for="(item,index) in sequenceList" :key="item.id" @click="selectItem(item,index)">
                            <i class="current material-icons">{{getCurrentIcon(item)}}</i>
                            <span class="text">{{item.name}}</span>
                            <span @click.stop="togglefavorite(item)" class="like">
                                <i class="material-icons">{{getFavoriteIcon(item)}}</i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="material-icons">clear</i>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <mu-dialog :open="showConfirm" title="清空" @close="closeConfirm">
                是否清空播放列表
                <mu-flat-button slot="actions" @click="closeConfirm" primary label="取消" />
                <mu-flat-button slot="actions" primary @click="confirmClear" label="清空" />
            </mu-dialog>
        </div>
    </transition>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Scroll from '@/base/scroll/scroll';
import { playMode } from '@/assets/js/config';
import { playerMixin } from '@/assets/js/mixin';

export default {
    mixins: [playerMixin],
    data() {
        return {
            refreshDelay: 100,
            showConfirm: false
        };
    },
    computed: {
        modeText() {
            const modeTexts = ['顺序播放', '单曲循环', '随机播放'];
            const modeText = modeTexts[this.mode];
            return `${modeText}${modeText !== '单曲循环'
                ? `(${this.playList.length}首)`
                : ''}`;
        },
        ...mapGetters(['playListVisible'])
    },
    methods: {
        show() {
            this.setPlayListVisible(true);
            // 延迟20ms刷新滚动列表
            setTimeout(() => {
                this.$refs.listContent.refresh();
                this.scrollToCurrent(this.currentSong);
            }, 20);
        },
        hide() {
            this.setPlayListVisible(false);
        },
        getCurrentIcon(item) {
            if (this.currentSong.id === item.id) {
                // return 'icon-play';
                return 'play_circle_outline';
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
            this.$refs.listContent.scrollToElement(
                this.$refs.list.$el.children[index],
                300
            );
        },
        deleteOne(item) {
            if (item.deleting) {
                return;
            }
            item.deleting = true;
            this.deleteSong(item);
            if (!this.playList.length) {
                this.hide();
            }
            setTimeout(() => {
                item.deleting = false;
            }, 300);
        },
        closeConfirm() {
            this.showConfirm = false;
        },
        confirmClear() {
            this.deleteSongList();
            this.closeConfirm();
            this.hide();
        },
        ...mapActions(['deleteSong', 'deleteSongList']),
        ...mapMutations({
            setPlayListVisible: 'SET_PLAY_LIST_VISIBLE'
        })
    },
    watch: {
        // 如果歌曲变化, 则滚动列表
        currentSong(newSong, oldSong) {
            if (!this.playListVisible || newSong.id === oldSong.id) {
                return;
            }
            setTimeout(() => {
                this.scrollToCurrent(newSong);
            }, 20);
        }
    },
    components: {
        Scroll
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
        background-color: $color-background;
        .list-header {
            position: relative;
            padding: 20px 30px 10px 20px;
            .title {
                display: flex;
                align-items: center;
                .icon {
                    margin-right: 10px;
                    font-size: 24px;
                    color: $color-theme;
                }
                .text {
                    flex: 1;
                    font-size: $font-size-medium;
                    color: $color-text;
                }
                .clear {
                    @include extend-click;
                    .material-icons {
                        font-size: $font-size-large-x;
                        color: $color-text;
                    }
                }
            }
        }
        .list-content {
            max-height: 240px;
            overflow: hidden;
            margin-bottom: 20px;
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
                    font-size: $font-size-large;
                    color: $color-theme;
                }
                .text {
                    flex: 1;
                    @include no-wrap;
                    font-size: $font-size-medium;
                    color: $color-text;
                }
                .like {
                    @include extend-click;
                    margin-right: 15px;
                    font-size: $font-size-small;
                    color: $color-theme;
                    .material-icons {
                        color: $color-icon;
                        font-size: 22px;
                    }
                }
                .delete {
                    @include extend-click;
                    font-size: $font-size-small;
                    color: $color-theme;
                    .material-icons {
                        font-size: 22px;
                    }
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
                border: 1px solid $color-text-ll;
                border-radius: 100px;
                color: $color-text-ll;
                .material-icons {
                    margin-right: 5px;
                    font-size: $font-size-medium-x;
                }
                .text {
                    font-size: $font-size-small;
                }
            }
        }
        .list-close {
            text-align: center;
            line-height: 50px;
            background: $color-highlight-background;
            font-size: $font-size-medium-x;
            color: $color-text-l;
        }
    }
}
</style>
