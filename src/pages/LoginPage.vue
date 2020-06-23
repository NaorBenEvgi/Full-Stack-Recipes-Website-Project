<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Login failed: {{ form.submitError }}</b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>-->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async updateMainPage(){
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/random",
          //"https://recipes-web-project.herokuapp.com/recipes/random",
          { withCredentials: true }
        );
        const response2 = await this.axios.get(
          this.$root.store.base_url + "/users/lastWatched",
          //"https://recipes-web-project.herokuapp.com/users/lastWatched",
          { withCredentials: true }
        );
        const recipes = response.data;
        const recipes2 = response2.data;
        this.$store.random_items.length = 0;
        this.$store.random_items.push(...recipes);
        this.$store.watched_items.length = 0;
        this.$store.watched_items.push(...recipes2);
      } catch (error) {
        console.log(error);
      }
    },
    async updateLastSeenRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/users/lastWatched",
          //"https://recipes-web-project.herokuapp.com/users/lastWatched",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.$store.watched_items.length = 0;
        this.$store.watched_items.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/random",
          //"https://recipes-web-project.herokuapp.com/recipes/random",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.$store.random_items.length = 0;
        this.$store.random_items.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + "/Login",
          //"https://recipes-web-project.herokuapp.com/Login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/").catch(() => {});
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      await this.Login();
      await this.updateMainPage();
      // await this.updateRandomRecipes();
      // await this.updateLastSeenRecipes();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
