<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';

export default {
    data() {
        return {
            songs: []
        };
    },
    computed: {
        ...mapGetters(['singer'])
    },
    created() {
        this._getDetail();
    },
    methods: {
        async _getDetail() {
            // 如果没有得到歌手id(比如在歌手详情页刷新)
            if (!this.singer.id) {
                this.$router.push('/singer');
                return;
            }
            try {
                // 请求歌手详情数据
                const res = await getSingerDetail(this.singer.id);
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list);
                }
            } catch (err) {
                console.error('获取歌手详情失败', err);
                throw err;
            }
        },
        _normalizeSongs(list) {
            const ret = [];
            for (let i = 0; i < list.length; i += 1) {
                const { musicData } = list[i];
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData));
                }
            }
            return ret;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
.singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-background;
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
