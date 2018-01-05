import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
// 登录页
const Login = () => import('@/pages/login/login');
// 注册页
const Register = () => import('@/pages/register/register');
// 最主要的页面
const Main = () => import('@/pages/main/main');
// 首页-推荐页
const Recommend = () => import('@/pages/main/recommend/recommend');
// 首页-歌手页
const Singer = () => import('@/pages/main/singer/singer');
// 首页-排行榜页
const Rank = () => import('@/pages/main/rank/rank');
// 首页-我的页
const Mine = () => import('@/pages/main/mine/mine');
// 首页-搜索页
const Search = () => import('@/pages/main/search/search');
// 歌手详情(所有歌曲)
const SingerDetail = () => import('@/components/singer-detail/singer-detail');
// 歌单详情
const Disc = () => import('@/components/disc/disc');
// 榜单详情
const TopList = () => import('@/components/top-list/top-list');
// 播放历史
const playHistory = () => import('@/components/play-history/play-history');
// 收藏的歌曲
const favoriteSong = () => import('@/components/favorite-song/favorite-song');
// 个人信息页
const Profile = () => import('@/pages/profile/profile');
// 换绑昵称页
const ChangeNickname = () =>
    import('@/pages/profile/change-nickname/change-nickname');
// 换绑手机号页
const ChangePhone = () => import('@/pages/profile/change-phone/change-phone');
// 换绑密码页
const ChangePassword = () =>
    import('@/pages/profile/change-password/change-password');
// 换绑设备页
const ChangeDevice = () =>
    import('@/pages/profile/change-device/change-device');
// 错误页
const NotFound = () => import('@/pages/not-found/not-found');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/main/recommend',
            alias: '/index.html'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            component: Profile,
            children: [
                {
                    path: 'phone',
                    component: ChangePhone
                },
                {
                    path: 'nickname',
                    component: ChangeNickname
                },
                {
                    path: 'password',
                    component: ChangePassword
                },
                {
                    path: 'device',
                    component: ChangeDevice
                }
            ]
        },
        {
            path: '/main',
            component: Main,
            redirect: '/main/recommend',
            children: [
                {
                    path: 'recommend',
                    component: Recommend,
                    children: [
                        {
                            path: ':id',
                            component: Disc
                        }
                    ]
                },
                {
                    path: 'singer',
                    component: Singer,
                    children: [
                        {
                            path: ':id',
                            component: SingerDetail
                        }
                    ]
                },
                {
                    path: 'rank',
                    component: Rank,
                    children: [
                        {
                            path: ':id',
                            component: TopList
                        }
                    ]
                },
                {
                    path: 'search',
                    component: Search,
                    children: [
                        {
                            path: ':id',
                            component: SingerDetail
                        }
                    ]
                },
                {
                    path: 'mine',
                    component: Mine,
                    // 用户收藏歌单
                    children: [
                        {
                            path: 'history',
                            component: playHistory
                        },
                        {
                            path: 'favorite_sheet/:id',
                            component: Disc
                        },
                        {
                            path: 'favorite_song',
                            component: favoriteSong
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

const mainRouteList = ['recommend', 'singer', 'rank', 'mine', 'search'];
const pathReg = /^\/main\/([a-z]{4,9})$/;

router.beforeEach((to, from, next) => {
    const { fullScreen, userCenterVisible, playListVisible } = store.getters;
    if (fullScreen) {
        store.commit('SET_FULL_SCREEN', false);
        next(false);
    } else if (userCenterVisible) {
        if (
            /^\/(profile|login)$/.test(to.path) ||
            /^\/(profile|login)$/.test(from.path)
        ) {
            next();
        } else {
            store.commit('SET_USER_CENTER_VISIBLE', false);
            next(false);
        }
    } else if (playListVisible) {
        store.commit('SET_PLAY_LIST_VISIBLE', false);
        next(false);
    } else {
        const toPath = pathReg.exec(to.path);
        const fromPath = pathReg.exec(from.path);
        if (toPath && toPath[1] && fromPath && fromPath[1]) {
            const toIndex = mainRouteList.indexOf(toPath[1]);
            const fromIndex = mainRouteList.indexOf(fromPath[1]);
            if (toIndex - fromIndex > 0) {
                store.commit('UPDATE_DIRECTION', 'forward');
            } else if (toIndex - fromIndex < 0) {
                store.commit('UPDATE_DIRECTION', 'reverse');
            }
        }
        next();
    }
});

export default router;
