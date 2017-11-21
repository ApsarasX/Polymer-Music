<template>
    <div class="singer">
        <list-view :data="singers"></list-view>
    </div>
</template>

<script>
import { getSingerList } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import Singer from '@/assets/js/singer';
import ListView from '@/base/listview/listview';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;
export default {
    data() {
        return {
            singers: []
        };
    },
    components: {
        ListView
    },
    created() {
        this._getSingerList();
    },
    methods: {
        /**
         * @private
         * @function _getSingerList - 获取歌手数据
         * */
        async _getSingerList() {
            try {
                const res = await getSingerList();
                if (res.code === ERR_OK) {
                    this.singers = this._normalizeSinger(res.data.list);
                }
            } catch (err) {
                throw err;
            }
        },
        _normalizeSinger(list) {
            const map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            };
            list.forEach((item, index) => {
                // 前HOT_SINGER_LEN个歌手放在热门里面
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(
                        new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        })
                    );
                }
                // 获取索引
                const key = item.Findex;
                // 如果不存在这个索引, 则创建它
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    };
                }
                // 将歌手放到对应索引里面
                map[key].items.push(
                    new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    })
                );
            });
            // 为了得到有序列表, 需要处理map
            const hot = [];
            const ret = [];
            Object.values(map).forEach(item => {
                if (item.title.match(/[a-zA-Z]/)) {
                    ret.push(item);
                } else if (item.title === HOT_NAME) {
                    hot.push(item);
                }
            });
            // 对ret按照字母排序
            ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
            return hot.concat(ret);
        }
    }
};
</script>

<style lang="scss" scoped>
.singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
}
</style>
