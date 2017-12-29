<template>
    <m-transition>
        <div class="histort-container">
            <mu-appbar :title="title">
                <mu-icon-button icon="arrow_back" slot="left" @click="back" />
            </mu-appbar>
            <scroll :data="songs" class="list-scroll">
                <div class="list-inner">
                    <song-list :songs="songs" @select="selectSong"></song-list>
                </div>
            </scroll>
        </div>
    </m-transition>
</template>

<script>
import SongList from '@/base/song-list/song-list';
import MTransition from '@/base/m-transition/m-transition';
import Scroll from '@/base/scroll/scroll';
import Song from '@/assets/js/song';
import { mapActions } from 'vuex';

export default {
    props: {
        title: {
            type: String,
            default: '歌曲列表'
        },
        songs: {
            type: Array,
            default: []
        }
    },
    components: {
        Scroll,
        SongList,
        MTransition
    },
    methods: {
        back() {
            this.$router.back();
        },
        selectSong(item) {
            this.insertSong(new Song(item));
        },
        ...mapActions(['insertSong'])
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variable.scss';
@import '~@/assets/scss/mixin.scss';

.histort-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-highlight-background;
}
.list-scroll {
    height: calc(100% - 56px);
    overflow: hidden;
}
.list-inner {
    padding: 20px 15px;
}
</style>
