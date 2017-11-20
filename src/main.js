import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import '@/assets/scss/index.scss';

// 懒加载中的图片
const defaultImage = require('@/assets/image/default.png');

Vue.config.productionTip = false;
fastclick.attach(document.body);
// 懒加载插件
Vue.use(VueLazyLoad, {
    loading: defaultImage
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
