<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '../music-list/music-list';
import { mapGetters } from 'vuex';
import { getSongList } from '../../api/recommend';
import { ERR_OK } from '../../api/config';
import { createSong } from '../../assets/js/song';

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
        title() {
            return this.disc.dissname;
        },
        bgImage() {
            return this.disc.imgurl;
        },
        ...mapGetters(['disc'])
    },
    methods: {
        _getSongList() {
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
