<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.image" alt="" class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left" @click="changeMode">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img :class="cdCls" :src="currentSong.image" alt="" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle :radius="radius" :percent="percent">
                        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// 第三方JS创建CSS3动画的库
import animations from 'create-keyframe-animation';
import { prefixStyle } from '@/assets/js/dom';
import { playMode } from '@/assets/js/config';
import ProgressBar from '@/base/progress-bar/progress-bar';
import progressCircle from '@/base/progress-circle/progress-circle';
import { shuffle } from '../../assets/js/util';

const transform = prefixStyle('transform');

export default {
    data() {
        return {
            songReady: false,
            currentTime: 0,
            radius: 32
        };
    },
    computed: {
        cdCls() {
            // 播放图片旋转
            return this.playing ? 'play' : 'play pause';
        },
        playIcon() {
            // 播放/暂停按钮
            return this.playing ? 'icon-pause' : 'icon-play';
        },
        iconMode() {
            const modeIcons = ['icon-sequence', 'icon-loop', 'icon-random'];
            return modeIcons[this.mode];
        },
        miniIcon() {
            // mini播放/暂停按钮
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
        },
        disableCls() {
            return this.songReady ? '' : 'disable';
        },
        percent() {
            // 歌曲播放进度比例
            return this.currentTime / this.currentSong.duration;
        },
        // 从Vuex获取播放器数据
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    methods: {
        // Vuex 的mutations
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAY_LIST'
        }),
        /**
         * @function back - 返回
         */
        back() {
            // 关闭全屏播放器
            this.setFullScreen(false);
        },
        /**
         * @function open - 打开全屏播放器
         */
        open() {
            this.setFullScreen(true);
        },
        enter(el, done) {
            const { x, y, scale } = this._getPosAndScale();

            // 定义动画样式
            const animation = {
                0: {
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                },
                60: {
                    transform: 'translate3d(0, 0, 0) scale(1.1)'
                },
                100: {
                    transform: 'translate3d(0, 0, 0) scale(1)'
                }
            };
            // 注册动画
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            });
            // 运行动画
            animations.runAnimation(this.$refs.cdWrapper, 'move', done);
        },
        afterEnter() {
            animations.unregisterAnimation('move');
            this.$refs.cdWrapper.style.animation = '';
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = 'all 0.4s';
            const { x, y, scale } = this._getPosAndScale();
            this.$refs.cdWrapper.style[
                transform
            ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            this.$refs.cdWrapper.addEventListener('transitionend', done);
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = '';
            this.$refs.cdWrapper.style[transform] = '';
        },
        togglePlaying() {
            if (!this.songReady) {
                return;
            }
            // 改变播放状态变量playing
            this.setPlayingState(!this.playing);
        },
        // 歌曲播放结束后如何选择下一首
        end() {
            if (this.mode === playMode.loop) {
                this.loop();
            } else {
                this.next();
            }
        },
        // 单曲循环
        loop() {
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.play();
        },
        prev() {
            if (!this.songReady) {
                return;
            }
            // 播放前一首歌曲
            let index = this.currentIndex + 1;
            if (index === this.playList.length) {
                index = 0;
            }
            this.setCurrentIndex(index);
            // 如果当前播放停止就切换歌曲, 同时改变播放状态变量
            if (!this.playing) {
                this.togglePlaying();
            }
            this.songReady = false;
        },
        next() {
            if (!this.songReady) {
                return;
            }
            // 播放后一首歌曲
            let index = this.currentIndex - 1;
            if (index < 0) {
                index = this.playList.length - 1;
            }
            this.setCurrentIndex(index);
            if (!this.playing) {
                this.togglePlaying();
            }
            this.songReady = false;
        },
        ready() {
            // 歌曲准备就绪
            this.songReady = true;
        },
        error() {
            this.songReady = true;
        },
        updateTime(e) {
            // 更新当前播放时间
            this.currentTime = e.target.currentTime;
        },
        format(interval) {
            const timestamp = Math.floor(interval);
            const minute = this._pad(Math.floor(timestamp / 60));
            const second = this._pad(timestamp % 60);
            return `${minute}:${second}`;
        },
        onProgressBarChange(percent) {
            // 根据进度条传过来的播放进度更改播放时间
            this.$refs.audio.currentTime = this.currentSong.duration * percent;
            // 如果暂停, 则开始播放
            if (!this.playing) {
                this.togglePlaying();
            }
        },
        changeMode() {
            // 改变播放模式
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            } else {
                list = this.sequenceList;
            }
            // 在set播放列表之前找到当前歌曲的index
            this._resetCurrentIndex(list);
            // set新的播放列表
            this.setPlayList(list);
        },
        _resetCurrentIndex(list) {
            // 在播放列表中找到当前歌曲index
            const index = list.findIndex(
                item => item.id === this.currentSong.id
            );
            this.setCurrentIndex(index);
        },
        _pad(num, n = 2) {
            const len = num.toString().length;
            let pad = '';
            if (len < n) {
                pad = '0'.repeat(n - len);
            }
            return `${pad}${num}`;
        },
        _getPosAndScale() {
            const targetWidth = 40;
            const paddingLeft = 40;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width;
            const x = paddingLeft - window.innerWidth * 0.5;
            const y =
                window.innerHeight - paddingTop - width * 0.5 - paddingBottom;
            return {
                x,
                y,
                scale
            };
        }
    },
    watch: {
        currentSong(newSong, oldSong) {
            if (newSong.id === oldSong.id) {
                return;
            }
            // 当currentSong变化的时候, 播放音乐
            this.$nextTick(() => {
                this.$refs.audio.play();
            });
        },
        playing(newPlaying) {
            // 根据播放状态变量playing控制播放器
            this.$nextTick(() => {
                const audio = this.$refs.audio;
                /* eslint-disable no-unused-expressions */
                newPlaying ? audio.play() : audio.pause();
            });
        }
    },
    components: {
        ProgressBar,
        progressCircle
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;
        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
        }
        .top {
            position: relative;
            margin-bottom: 25px;
            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: $font-size-large-x;
                    color: $color-theme;
                    transform: rotate(-90deg);
                }
            }
            .title {
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                @include no-wrap;
                font-size: $font-size-large;
                color: $color-text;
            }
            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }
        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;
            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;
                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    height: 100%;
                    .cd {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border: 10px solid rgba(255, 255, 255, 0.1);
                        border-radius: 50%;
                        &.play {
                            animation: rotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                        }
                        .image {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }

                .playing-lyric-wrapper {
                    width: 80%;
                    margin: 30px auto 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .playing-lyric {
                        height: 20px;
                        line-height: 20px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                }
            }
            .middle-r {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .lyric-wrapper {
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;
                    .text {
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;
                        &.current {
                            color: $color-text;
                        }
                    }
                }
            }
        }
        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;
            .dot-wrapper {
                text-align: center;
                font-size: 0;
                .dot {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;
                    &.active {
                        width: 20px;
                        border-radius: 5px;
                        background: $color-text-ll;
                    }
                }
            }
            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .time {
                    color: $color-text;
                    font-size: $font-size-small;
                    flex: 0 0 30px;
                    line-height: 30px;
                    width: 30px;
                    &.time-l {
                        text-align: left;
                    }
                    &.time-r {
                        text-align: right;
                    }
                }
                .progress-bar-wrapper {
                    flex: 1;
                    margin: 0 10px;
                }
            }
            .operators {
                display: flex;
                align-items: center;
                .icon {
                    flex: 1;
                    color: $color-theme;
                    &.disable {
                        color: $color-theme-d;
                    }
                    i {
                        font-size: 30px;
                    }
                }
                .i-left {
                    text-align: right;
                }
                .i-center {
                    padding: 0 20px;
                    text-align: center;
                    i {
                        font-size: 40px;
                    }
                }
                .i-right {
                    text-align: left;
                }
                .icon-favorite {
                    color: $color-sub-theme;
                }
            }
        }
        &.normal-enter-active,
        &.normal-leave-active {
            transition: all 0.4s;
            .top,
            .bottom {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }
        &.normal-enter,
        &.normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
    }
    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;
        &.mini-enter-active,
        &.mini-leave-active {
            transition: all 0.4s;
        }
        &.mini-enter,
        &.mini-leave-to {
            opacity: 0;
        }
        .icon {
            flex: 0 0 40px;
            width: 40px;
            padding: 0 10px 0 20px;
            img {
                border-radius: 50%;
                &.play {
                    animation: rotate 10s linear infinite;
                }
                &.pause {
                    animation-play-state: paused;
                }
            }
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                margin-bottom: 2px;
                @include no-wrap;
                font-size: $font-size-medium;
                color: $color-text;
            }
            .desc {
                @include no-wrap;
                font-size: $font-size-small;
                color: $color-text-d;
            }
        }
        .control {
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;
            .icon-play-mini,
            .icon-pause-mini,
            .icon-playlist {
                font-size: 30px;
                color: $color-theme-d;
            }
            .icon-mini {
                font-size: 32px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
