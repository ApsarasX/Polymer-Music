import 'babel-polyfill';
import './assets/js/hack';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import '@/assets/scss/index.scss';
// /* eslint-disable no-unused-vars */
// import VConsole from 'vconsole';
// // 移动端调试
// const vConsole = new VConsole();

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
    store,
    router,
    render: h => h(App)
});
