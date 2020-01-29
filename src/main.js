import Vue from "vue";
import App from "./App.vue";
import wb from "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$workbox = wb;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
