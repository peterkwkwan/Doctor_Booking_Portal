import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Dayjs from 'vue-dayjs';

Vue.config.productionTip = false;
Vue.use(Dayjs, {
  lang: 'en',
  filters: {
    ago: 'ago',
  },
  directives: {
    countdown: 'countdown',
  },
});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
