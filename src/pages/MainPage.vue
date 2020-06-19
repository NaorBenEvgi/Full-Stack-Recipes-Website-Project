<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList
      title="Randome Recipes"
      class="RandomRecipes center"
      :recipes="random_recipes"
    />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList
      title="Last Viewed Recipes"
      :recipes="last_seen_recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      random_recipes: [],
      last_seen_recipes: []
    };
  },
  mounted() {
    this.updateRandomRecipes();
    this.updateLastSeenRecipes();
  },
  methods: {
    async updateRandomRecipes() {
      try {
        const response = await this.axios.get(
          "https://recipes-web-project.herokuapp.com/recipes/random",
          { withCredentials: true }
        );
        const recipes = response.data;
        //this.random_recipes = [];
        this.random_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async updateLastSeenRecipes() {
      try {
        const response = await this.axios.get(
          "https://recipes-web-project.herokuapp.com/users/lastWatched"
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
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
