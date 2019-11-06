import Vue from "vue";
import App from "./App.vue";
import "./plugins/element";
import router from "./router";
import axios from "axios";
import EleForm from "vue-ele-form";

Vue.use(EleForm);

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
