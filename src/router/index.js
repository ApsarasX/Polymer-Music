import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
// 首页-推荐页
const Recommend = () => import('@/components/recommend/recommend');
// 首页-歌手页
const Singer = () => import('@/components/singer/singer');
// 首页-排行榜页
const Rank = () => import('@/components/rank/rank');
// 首页-搜索页
const Search = () => import('@/components/search/search');
// 歌手详情(所有歌曲)
const SingerDetail = () => import('@/components/singer-detail/singer-detail');
// 歌单详情
const Disc = () => import('@/components/disc/disc');
// 榜单详情
const TopList = () => import('@/components/top-list/top-list');
// 用户中心
const UserCenter = () => import('@/components/user-center/user-conter');

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
    if (store.getters.fullScreen) {
        store.commit('SET_FULL_SCREEN', false);
        next(false);
    } else {
        next();
    }
});

export default router;
