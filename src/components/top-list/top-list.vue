<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '../music-list/music-list';
import { mapGetters } from 'vuex';
import { getMusicList } from '../../api/rank';
import { ERR_OK } from '../../api/config';
import { createSong } from '../../assets/js/song';

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
        title() {
            return this.topList.topTitle;
        },
        bgImage() {
            if (this.songs.length) {
                return this.songs[0].image;
            }
            return '';
        },
        ...mapGetters(['topList'])
    },
    components: {
        MusicList
    },
    methods: {
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
        _normalizeSongs(list) {
            const ret = [];
            for (let i = 0; i < list.length; i += 1) {
                const item = list[i];
                const musicData = item.data;
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData));
                }
            }
            return ret;
        }
    }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3 ease;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>
