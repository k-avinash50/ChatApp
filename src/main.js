import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faDesktop,
  faHome,
  faUsers,
  faGlassCheers,
  faGamepad,
  faTimes,
  faEdit,
  faCheck,
  faPlus,
  faBook,
  faCalculator
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "../src/store/store.js";

library.add(
  faCoffee,
  faDesktop,
  faHome,
  faUsers,
  faGlassCheers,
  faGamepad,
  faTimes,
  faEdit,
  faCheck,
  faPlus,
  faBook,
  faCalculator
);
import registerServiceWorker from "./registerServiceWorker";
import Chat from "vue-beautiful-chat";
Vue.use(Chat);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

global.Vue = Vue;
new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");

registerServiceWorker();
