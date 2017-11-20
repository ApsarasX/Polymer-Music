<template>
    <div class="recommend">
        <div class="recommend-content">
            <!-- 注意此处, 必须有v-if, 否则获取不到数据使得slider的DOM出错-->
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="(item,index) in recommends" :key="index">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="slider-img">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list"></div>
        </div>
    </div>
</template>

<script>
/**
 * @requires Slider - UI组件
 * @requires getRecommend - 公共方法
 * @requires ERR_OK - 配置常量
 */
import Slider from '@/base/slider/slider';
import { getRecommend } from '@/api/recommend';
import { ERR_OK } from '@/api/config';

export default {
    created() {
        this._getRecommend();
    },
    data() {
        return {
            recommends: []
        };
    },
    components: {
        Slider
    },
    methods: {
        async _getRecommend() {
            try {
                const res = await getRecommend();
                if (res.code === ERR_OK) {
                    this.recommends = res.data.slider;
                }
            } catch (err) {
                throw err;
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
