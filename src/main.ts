import Vue from 'vue'
import VueResource from "vue-resource"
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import router from './routes'
import messages from '@/locales/messages'
import dateTimeFormats from '@/locales/dateTimeFormats'
import configs from './app.config'
import snakeCaseKeys from 'snakecase-keys';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuelidate);

(Vue as any).http.options.root = configs.hostname;
(Vue as any).http.interceptors.push(function(this: Vue, request: any) {
  const token: string | null = this.$store.state.token;
  // @ts-ignore
  if (!this.requireAuth || token) {
    request.headers.set('Authorization', token);
  } else {
    return request.respondWith(JSON.stringify({ error: "Unauthenticated" }), {
      status: 401,
      statusText: 'Session token not found'
    });
  }
});
(Vue as any).http.interceptors.push(function(this: Vue, request: any) {
  if (!request.body) {
    return
  }
  request.body = snakeCaseKeys(request.body)
});

const i18n = new VueI18n({
  locale: 'ru',
  messages,
  dateTimeFormats
});

let v = new Vue({
  render: h => h(App),
  store,
  router,
  i18n
}).$mount('#app');
