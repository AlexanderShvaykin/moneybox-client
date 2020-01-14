import Vue from 'vue'
import VueResource from "vue-resource"
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import router from './routes'
import messages from './i18n'
import configs from './app.config'

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

const i18n = new VueI18n({
  locale: 'ru',
  messages,
});

let v = new Vue({
  render: h => h(App),
  store,
  router,
  i18n
}).$mount('#app');
