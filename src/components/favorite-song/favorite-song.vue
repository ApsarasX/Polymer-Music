<template>
    <pure-music-list title="收藏歌曲" :songs="favoriteList"></pure-music-list>
</template>
<script>
import PureMusicList from '@/components/pure-music-list/pure-music-list';
import { mapGetters } from 'vuex';

export default {
    components: {
        PureMusicList
    },
    computed: {
        ...mapGetters(['favoriteList'])
    }
};
</script>
