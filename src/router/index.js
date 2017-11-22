import Vue from 'vue';
import Router from 'vue-router';
// 首页-推荐页
import Recommend from '@/components/recommend/recommend';
// 首页-歌手页
import Singer from '@/components/singer/singer';
// 首页-排行榜页
import Rank from '@/components/rank/rank';
// 首页-搜索页
import Search from '@/components/search/search';

import SingerDetail from '@/components/singer-detail/singer-detail';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/search',
            component: Search
        }
    ]
});
