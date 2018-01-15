<template>
    <m-transition>
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </m-transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { getMusicList } from '@/api/rank';
import { ERR_OK } from '@/api/config';
import { createSong, isValidMusic } from '@/assets/js/song';
import MTransition from '@/base/m-transition/m-transition';
import storage from 'good-storage';

export default {
    activated() {
        this._getMusicList();
    },
    deactivated() {
        this.songs = [];
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
            return this.topList.picUrl || '';
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
        async _getMusicList() {
            if (!this.topList || !this.topList.id) {
                this.topListId = this.$router.currentRoute.params.id;
            }
            // 获取的缓存歌单列表数据
            const tempSongs = storage.session.get(
                `__topList_${this.topList.id || this.topListId}__`,
                []
            );
            if (tempSongs.length > 0) {
                this.songs = this._normalizeSongs(tempSongs);
            }
            try {
                const res = await getMusicList(
                    this.topList.id || this.topListId
                );
                if (res.code === ERR_OK) {
                    if (tempSongs.length === 0) {
                        this.songs = this._normalizeSongs(res.songlist);
                        // 缓存歌单列表数据
                        storage.session.set(
                            `__topList_${this.topList.id || this.topListId}__`,
                            res.songlist
                        );
                    }
                    if (!this.topList || !this.topList.id) {
                        this.setTopList({
                            id: this.topList.id || this.topListId,
                            picUrl: res.topinfo.pic,
                            topTitle: res.topinfo.ListName
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
        },
        ...mapMutations({
            setTopList: 'SET_TOP_LIST'
        }),
        ...mapActions(['setPopup'])
    }
};
</script>

<style lang="scss" scoped>

</style>
