<template>
    <pure-music-list title="最近收听" :songs="playHistory"></pure-music-list>
</template>
<script>
import PureMusicList from '@/components/pure-music-list/pure-music-list';
import { mapGetters } from 'vuex';

export default {
    components: {
        PureMusicList
    },
    computed: {
        ...mapGetters(['playHistory'])
    }
};
</script>
