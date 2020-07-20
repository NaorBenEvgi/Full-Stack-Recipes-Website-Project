import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import { global_data } from "./shared_data";
Vue.prototype.$store = global_data;
import VueCookies from 'vue-cookies'
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueCookies);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});


const shared_data = {
  base_url: "http://localhost:3000",
  //base_url: "https://recipes-web-project.herokuapp.com",
  username: localStorage.username,
  login(username) {
    console.log(global_data.watched_items.length);
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    console.log(global_data.watched_items);
    global_data.watched_items.length === 0;
    global_data.search_items.length === 0;
    global_data.random_items.length === 0;
    global_data.saved_recipes.length === 0;
    global_data.my_recipes.length === 0;
    global_data.family_recipes.length === 0;
    console.log(global_data.watched_items);
    Vue.$cookies.remove("session");
    localStorage.removeItem("username");
    this.username = undefined;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

router.beforeEach((to, from, next) => {
  // if there was a transition from logged in to session expired or localStorage was deleted

  // if we try to enter auth required pages and we are not authorized
  if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
    if (
      (shared_data.username === undefined && Vue.$cookies.get("session")) ||
      (shared_data.username !== undefined && !Vue.$cookies.get("session"))
    ) {
      shared_data.logout();
    }
    //if the route requires Autorization and we know the user is not authoried, we redirect to login page
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      next({ name: "login" });
    } else next();
  } else next();
});


// // router.beforeEach((to, from, next) => {
// //   console.log(Vue.$cookies.get("session"));
// //   // if the user was logged in and than the cookie  expired: if in local storage there is username but there is no cookie
// //   // if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
// //   //     // logout forcely
// //   //     shared_data.logout();
// //   //     // redirect to main/home page
// //   //     next({ name: 'main' });

// //   // } else {
// //   //     next();
// //   // }
// //   // console.log(555, Vue.$cookies.keys());
// //   next();
// // });

// router.beforeEach((to, from, next) => {
//   console.log(Vue.$cookies.get("session"));
//   if (
//     (shared_data.username === undefined && Vue.$cookies.get("session")) ||
//     (shared_data.username !== undefined && !Vue.$cookies.get("session"))
//   ) {
//     //logout forcely
//     shared_data.logout();
//     next({name: "main"});
//     //redirect to login if login is not the destination
//     //if (to.name !== "login") next({ name: "login" });
//     //else next();
//   } else {
//     next();
//   }
// });

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormCheckboxPlugin,
  FormRadioPlugin,
  BootstrapVue,
  BootstrapVueIcons,
  OverlayPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  FormCheckboxPlugin,
  FormRadioPlugin,
  BootstrapVue,
  BootstrapVueIcons,
  OverlayPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;


new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
