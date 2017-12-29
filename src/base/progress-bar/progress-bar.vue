<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend.prevent="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixStyle } from '@/assets/js/dom';

// 播放点宽度
const progressBtnWidth = 16;

const transform = prefixStyle('transform');

export default {
    props: {
        // 播放进度比例
        percent: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.touch = {};
    },
    methods: {
        progressTouchStart(e) {
            // initiated表示是否正在拖动或者点击进度条
            this.touch.initiated = true;
            this.touch.startX = e.touches[0].pageX;
            this.touch.left = this.$refs.progress.clientWidth;
        },
        progressTouchMove(e) {
            if (!this.touch.initiated) {
                return;
            }
            const deltaX = e.touches[0].pageX - this.touch.startX;
            const offsetWidth = Math.min(
                this.$refs.progressBar.clientWidth - progressBtnWidth,
                Math.max(0, this.touch.left + deltaX)
            );
            this._offset(offsetWidth);
            this.$emit('percentChanging', this._getPercent());
        },
        progressTouchEnd() {
            this._triggerPercent();
            this.touch.initiated = false;
        },
        // 点击进度条
        progressClick(e) {
            const rect = this.$refs.progressBar.getBoundingClientRect();
            const offsetWidth = e.pageX - rect.left;
            this._offset(offsetWidth);
            // 点击progress-btn时候, offsetX获取不对
            // this._offset(e.offsetX);
            this._triggerPercent();
        },
        setProgressOffset(percent) {
            if (percent >= 0 && !this.touch.initiated) {
                const barWidth =
                    this.$refs.progressBar.clientWidth - progressBtnWidth;
                const offsetWidth = percent * barWidth;
                this._offset(offsetWidth);
            }
        },
        _offset(offsetWidth) {
            // 播放进度条偏移
            this.$refs.progress.style.width = `${offsetWidth}px`;
            // 播放点小球偏移
            this.$refs.progressBtn.style[
                transform
            ] = `translate3d(${offsetWidth}px, 0, 0)`;
        },
        _triggerPercent() {
            this.$emit('percentChange', this._getPercent());
        },
        _getPercent() {
            const barWidth =
                this.$refs.progressBar.clientWidth - progressBtnWidth;
            return this.$refs.progress.clientWidth / barWidth;
        }
    },
    watch: {
        percent(newPercent) {
            this.setProgressOffset(newPercent);
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.progress-bar {
    height: 30px;
}
.bar-inner {
    position: relative;
    top: 13px;
    height: 2px;
    background: rgba(225, 225, 225, 0.42);
}
.progress {
    position: absolute;
    height: 100%;
    background: $color-theme;
}
.progress-btn-wrapper {
    position: absolute;
    left: -8px;
    top: -13px;
    width: 30px;
    height: 30px;
}
.progress-btn {
    position: relative;
    top: 7px;
    left: 7px;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #fff;
}
</style>
