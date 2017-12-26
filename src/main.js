import 'babel-polyfill';
import './assets/js/hack';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import '@/assets/scss/index.scss';
// Muse-UI组件引入
import appBar from 'muse-ui/src/appBar';
// import avatar from 'muse-ui/src/avatar';
import {
    card,
    cardMedia,
    cardTitle,
    cardText,
    cardActions
} from 'muse-ui/src/card';
import dialog from 'muse-ui/src/dialog';
import divider from 'muse-ui/src/divider';
import drawer from 'muse-ui/src/drawer';
import flatButton from 'muse-ui/src/flatButton';
import icon from 'muse-ui/src/icon';
import iconButton from 'muse-ui/src/iconButton';
import { list, listItem } from 'muse-ui/src/list';
import popup from 'muse-ui/src/popup';
import raisedButton from 'muse-ui/src/raisedButton';
import { stepper, step, stepLabel } from 'muse-ui/src/stepper';
import subHeader from 'muse-ui/src/subHeader';
import textField from 'muse-ui/src/textField';
import _switch from 'muse-ui/src/switch';

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
Vue.component(appBar.name, appBar);
// Vue.component(avatar.name, avatar);
Vue.component(card.name, card);
Vue.component(cardMedia.name, cardMedia);
Vue.component(cardTitle.name, cardTitle);
Vue.component(cardText.name, cardText);
Vue.component(cardActions.name, cardActions);
Vue.component(dialog.name, dialog);
Vue.component(divider.name, divider);
Vue.component(drawer.name, drawer);
Vue.component(flatButton.name, flatButton);
Vue.component(icon.name, icon);
Vue.component(iconButton.name, iconButton);
Vue.component(list.name, list);
Vue.component(listItem.name, listItem);
Vue.component(popup.name, popup);
Vue.component(raisedButton.name, raisedButton);
Vue.component(stepper.name, stepper);
Vue.component(step.name, step);
Vue.component(stepLabel.name, stepLabel);
Vue.component(subHeader.name, subHeader);
Vue.component(textField.name, textField);
Vue.component(_switch.name, _switch);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
