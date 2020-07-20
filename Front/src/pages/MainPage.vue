<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <h1 id="main-title" class="title text-center">Cooking Together</h1>
      </b-col>
    </b-row>
    <b-row >
      <b-col >
        <h1 class="title subtitle">Explore These Recipes</h1>
        <RecipePreviewList
          title="Explore These Recipes"
          class="RandomRecipes center"
          :recipes="random_recipes"
        />
        <b-button style="margin: 15px 0px 80px 200px;" variant="info" @click="updateRandomRecipes">Refresh</b-button>
      </b-col>
      <b-col v-if="!$root.store.username">
        <LoginPage></LoginPage>
      </b-col>
      <b-col v-else>
        <h1 class="title subtitle">Last Watched Recipes</h1>
        <RecipePreviewList
          title="Last Watched Recipes"
          :recipes="last_seen_recipes"
          :class="{
        RandomRecipes: true,
        blur: !$root.store.username,

        center: true
      }"
          disabled
        ></RecipePreviewList>
      </b-col>
    </b-row>

    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    LoginPage
  },
  data() {
    return {
     // logged_in: false,
      random_recipes: this.$store.random_items,
      last_seen_recipes: this.$store.watched_items,
    };
  },
  created() {
    if (this.$store.random_items.length === 0) {
      this.updateRandomRecipes();
    }
    if (
      this.$root.store.username &&
      this.$store.watched_items.length === 0
    ) {
      this.updateLastSeenRecipes();
    }
  },
  mounted() {
    console.log("mounted");
    // console.log(this.$cookies.get("session"));
    // if(this.$cookies.get("session") && this.$store.watched_items.length === 0){
    //   this.updateLastSeenRecipes();
    // }
  },
  updated() {
    console.log("updated");
    // if(this.$root.store.username && !this.logged_in ){
    //   this.updateLastSeenRecipes();
    // }
  },
  methods: {
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/random",
          //"https://recipes-web-project.herokuapp.com/recipes/random",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.random_recipes.push(...recipes);
        this.$store.random_items.length = 0;
        this.$store.random_items.push(...recipes);
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
        //this.last_seen_recipes = [];
        this.last_seen_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
#main-title{
  color: #d54d7b; font-family: "Great Vibes", cursive; font-size: 100px; line-height: 160px; font-weight: bold; margin-bottom: 0px; margin-top: 40px; text-align: center; text-shadow: 0 1px 1px #fff;
}
</style>
