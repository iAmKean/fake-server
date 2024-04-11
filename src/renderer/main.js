import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// reset css
import "./resources/styles/reset.css"

// fonts
import "./resources/styles/fonts.scss"
// flexbox
import "./resources/styles/flexbox.scss"

/*
**Library: iview
**Description: Customized theme[PC terminal]
*/
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { locale } from 'view-design';
import en from 'view-design/dist/locale/en-US';
// import zh from 'view-design/dist/locale/zh-CN';

locale(en);
Vue.use(ViewUI, { locale });

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
