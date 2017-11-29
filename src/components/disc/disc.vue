<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '../music-list/music-list';
import { mapGetters } from 'vuex';
import { getSongList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';

export default {
    components: {
        MusicList
    },
    data() {
        return {
            songs: []
        };
    },
    created() {
        this._getSongList();
    },
    computed: {
        // 歌单标题
        title() {
            return this.disc.dissname;
        },
        // 歌单顶部背景图片
        bgImage() {
            return this.disc.imgurl;
        },
        // 从Vuex获取过来的当前歌单信息
        ...mapGetters(['disc'])
    },
    methods: {
        /**
         * @private
         * @function _getSongList 获取歌单里的歌曲数据
         */
        _getSongList() {
            // 如果没有歌单id, 返回排行榜页
            if (!this.disc.dissid) {
                this.$router.push('/recommend');
                return;
            }
            getSongList(this.disc.dissid).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist);
                }
            });
        },

        /**
         * @private
         * @function _normalizeSongs 整理歌单里的歌曲数据
         * @param {String} list 歌曲列表数据
         * @return {[Object]}
         */
        _normalizeSongs(list) {
            const ret = [];
            for (let i = 0; i < list.length; i += 1) {
                const song = list[i];
                if (song.songid && song.albumid) {
                    ret.push(createSong(song));
                }
            }
            return ret;
        }
    }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leav-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
