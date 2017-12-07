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
// 歌手详情(所有歌曲)
import SingerDetail from '@/components/singer-detail/singer-detail';
// 歌单详情
import Disc from '@/components/disc/disc';
// 榜单详情
import TopList from '@/components/top-list/top-list';
// 用户中心
import UserCenter from '@/components/user-center/user-conter';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ]
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
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: TopList
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/user',
            component: UserCenter
        }
    ]
});
