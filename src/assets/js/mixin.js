import { mapGetters } from 'vuex';

// 组件公用的Mixin
export const playListMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    mounted() {
        this.handlePlayList(this.playList);
    },
    activated() {
        this.handlePlayList(this.playList);
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal);
        }
    },
    methods: {
        handlePlayList() {
            throw new Error('component must implement handlePlayList method');
        }
    }
};

// eslint 占位
export const xx = 0;
