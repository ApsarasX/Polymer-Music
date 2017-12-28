<template>
    <m-transition>
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </m-transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list';
import { mapGetters } from 'vuex';
import { getMusicList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import { createSong, isValidMusic } from '@/assets/js/song';
import MTransition from '@/base/m-transition/m-transition';

export default {
    created() {
        this._getMusicList();
    },
    data() {
        return {
            songs: [],
            rank: true
        };
    },
    computed: {
        // 排行榜标题
        title() {
            return this.topList.topTitle;
        },
        // 排行榜顶部背景图
        bgImage() {
            if (this.songs.length) {
                return this.songs[0].image;
            }
            return '';
        },
        // 从Vuex传过来的当前排行榜的信息
        ...mapGetters(['topList'])
    },
    components: {
        MusicList,
        MTransition
    },
    methods: {
        /**
         * @private
         * @function _getMusicList 获取排行榜数据
         */
        _getMusicList() {
            if (!this.topList.id) {
                this.$router.push('/rank');
                return;
            }
            getMusicList(this.topList.id).then(res => {
                if (res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.songlist);
                }
            });
        },
        /**
         * @private
         * @function _normalizeSongs 整理排行榜里的歌曲数据
         * @param {String} list 歌曲列表数据
         * @return {Array}
         */
        _normalizeSongs(list) {
            const ret = [];
            for (let i = 0; i < list.length; i += 1) {
                const item = list[i];
                const musicData = item.data;
                if (isValidMusic(musicData)) {
                    ret.push(createSong(musicData));
                }
            }
            return ret;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
