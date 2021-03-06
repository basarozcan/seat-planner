import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/css/tailwind.css";
import VueRouter from "vue-router";
import { routes } from "./routes";

import relativeDate from "tiny-relative-date";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faAlignJustify,
  faMale,
  faHeart,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import VueTailwindModal from "vue-tailwind-modal";

library.add(faTrash);
library.add(faAlignJustify);
library.add(faMale);
library.add(faHeart);
library.add(faEdit);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);
// Vue.use(VueTailwindModal);
Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$relativeDate", { value: relativeDate });

const router = new VueRouter({
  routes,
  mode: "history", // short for `routes: routes`
});

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
