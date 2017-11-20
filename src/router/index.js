import Vue from 'vue';
import Router from 'vue-router';
import Recommend from '@/components/recommend/recommend';
import Singer from '@/components/singer/singer';
import Rank from '@/components/rank/rank';
import Search from '@/components/search/search';

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
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/singer',
            component: Singer,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/rank',
            component: Rank,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                keepAlive: true
            }
        }
    ]
});
