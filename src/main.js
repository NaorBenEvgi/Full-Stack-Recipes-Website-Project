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
  //base_url: "http://localhost:3000",
  base_url: "https://recipes-web-project.herokuapp.com",
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

router.beforeEach((to, from, next) => {
  console.log(Vue.$cookies.get("session"));
  // if the user was logged in and than the cookie  expired: if in local storage there is username but there is no cookie
  // if (shared_data.username === undefined || !Vue.$cookies.get("session")) {
  //     // logout forcely
  //     shared_data.logout();
  //     // redirect to main/home page
  //     next({ name: 'main' });

  // } else {
  //     next();
  // }
  // console.log(555, Vue.$cookies.keys());
  next();
});

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
  BootstrapVueIcons
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
  BootstrapVueIcons
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
