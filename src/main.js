/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
// 匯入 vue-axios 主套件
import VueAxios from 'vue-axios';
// jQuery 已移除，如需使用請在個別組件中導入
// import jquery from 'jquery';
// 匯入 vue-loading 主套件
import Loading from 'vue-loading-overlay';
// 匯入 CKEditor 主套件
import CKEditor from '@ckeditor/ckeditor5-vue';
// 匯入 vee-validate 主套件
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import './assets/all.scss';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faLine,
  faInstagram,
  faPeriscope,
} from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faEnvelope,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { date, currency } from '@/methods/filters';

import App from './App.vue';
import router from './router';

/**
 * 這裡是將所有 vee-validate 的規則載入
 */
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
/**
 * 這裡是設定 vee-validate 的語系
 */
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

/* add icons to the library */
library.add(faFacebook, faLine, faInstagram, faPeriscope, faPhone, faEnvelope, faPlus, faMinus);

// jQuery 全域暴露已移除以提升安全性
// 如需使用 jQuery，請在個別組件中直接 import jquery
// window.$ = jquery;

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);

app.component('VueLoading', Loading);
app.component('VeeForm', Form);
app.component('VeeField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
