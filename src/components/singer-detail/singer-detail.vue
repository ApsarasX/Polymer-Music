<template>
    <m-transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </m-transition>
</template>
<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';
import MusicList from '@/components/music-list/music-list';
import MTransition from '@/base/m-transition/m-transition';

export default {
    data() {
        return {
            songs: []
        };
    },
    computed: {
        title() {
            return this.singer.name;
        },
        bgImage() {
            return this.singer.avatar;
        },
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
    },
    components: {
        MusicList,
        MTransition
    }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
