<template>
    <m-transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </m-transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';
import MusicList from '@/components/music-list/music-list';
import MTransition from '@/base/m-transition/m-transition';
import storage from 'good-storage';

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
    activated() {
        this._getDetail();
    },
    deactivated() {
        this.songs = [];
    },
    methods: {
        async _getDetail() {
            // 如果没有得到歌手id(比如在歌手详情页刷新)
            if (!this.singer || !this.singer.id) {
                this.singerId = this.$router.currentRoute.params.id;
            }
            const tempSongs = storage.session.get(
                `__singer_${this.singer.id || this.singerId}__`,
                []
            );
            if (tempSongs.length > 0) {
                this.songs = this._normalizeSongs(tempSongs);
            }
            try {
                // 请求歌手详情数据
                const res = await getSingerDetail(
                    this.singer.id || this.singerId
                );
                if (res.code === ERR_OK) {
                    if (tempSongs.length === 0) {
                        this.songs = this._normalizeSongs(res.data.list);
                        // 缓存歌单列表数据
                        storage.session.set(
                            `__singer_${this.singer.id || this.singerId}__`,
                            res.data.list
                        );
                    }
                    if (!this.singer || !this.singer.id) {
                        this.setSinger({
                            id: res.data.singer_mid,
                            name: res.data.singer_name,
                            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res
                                .data.singer_mid}.jpg?max_age=2592000`
                        });
                    }
                }
            } catch (err) {
                this.setPopup('网络错误');
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
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions(['setPopup'])
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
