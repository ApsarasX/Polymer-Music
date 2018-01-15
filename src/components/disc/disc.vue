<template>
    <m-transition>
        <!-- isDisc 是否是歌单 -->
        <music-list :title="title" :bg-image="bgImage" :songs="songs" :isDisc="true" :isFavorite="isFavorite" @favoriteChange="toggleFavorite"></music-list>
    </m-transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list';
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { getSongList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { createSong, isValidMusic } from '@/assets/js/song';
import { sheetMixin } from '@/assets/js/mixin';
import MTransition from '@/base/m-transition/m-transition';
import storage from 'good-storage';

export default {
    mixins: [sheetMixin],
    components: {
        MusicList,
        MTransition
    },
    data() {
        return {
            songs: []
        };
    },
    activated() {
        this._getSongList();
    },
    deactivated() {
        this.songs = [];
    },
    computed: {
        // 歌单标题
        title() {
            return this.disc.name;
        },
        // 歌单顶部背景图片
        bgImage() {
            return this.disc.image;
        },
        ...mapGetters(['disc'])
    },
    methods: {
        /**
         * @private
         * @function _getSongList 获取歌单里的歌曲数据
         */
        async _getSongList() {
            // 如果没有歌单id, 根据页面url获取
            if (!this.disc || !this.disc.id) {
                this.discId = this.$router.currentRoute.params.id;
            }
            // 获取的缓存歌单列表数据
            const tempSongs = storage.session.get(
                `__disc_${this.disc.id || this.discId}__`,
                []
            );
            if (tempSongs.length > 0) {
                this.songs = this._normalizeSongs(tempSongs);
            }
            try {
                const res = await getSongList(this.disc.id || this.discId);
                if (res.code === ERR_OK) {
                    if (tempSongs.length === 0) {
                        this.songs = this._normalizeSongs(
                            res.cdlist[0].songlist
                        );
                        // 缓存歌单列表数据
                        storage.session.set(
                            `__disc_${res.cdlist[0].disstid}__`,
                            res.cdlist[0].songlist
                        );
                    }
                    if (!this.disc || !this.disc.id) {
                        this.setDisc({
                            id: res.cdlist[0].disstid,
                            name: res.cdlist[0].dissname,
                            image: res.cdlist[0].logo,
                            creatorName: res.cdlist[0].nick
                        });
                    }
                }
            } catch (err) {
                this.setPopup('网络错误');
                throw err;
            }
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
                    if (isValidMusic(song)) {
                        ret.push(createSong(song));
                    }
                }
            }
            return ret;
        },
        ...mapMutations({ setDisc: 'SET_DISC' }),
        ...mapActions(['setPopup'])
    }
};
</script>

<style lang="scss" scoped>

</style>
