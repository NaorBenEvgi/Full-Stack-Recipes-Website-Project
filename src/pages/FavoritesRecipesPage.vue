<template>
  <div class="container">
    <h1 class="title">Favorites Recipes Page</h1>
    <RecipePreviewList
      title="Randome Recipes"
      class="RandomRecipes center"
      :recipes="favorites_recipes"
    ></RecipePreviewList>
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
      favorites_recipes: this.$store.saved_recipes
    };
  },
  created() {
    console.log(this.$store.saved_recipes.length);
    if (this.$store.saved_recipes.length === 0) {
      this.updateFavoriteRecipes();
    }
  },
  methods: {
    async updateFavoriteRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/users/favorites",
          //"https://recipes-web-project.herokuapp.com/users/favorites",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.favorites_recipes.push(...recipes);
        this.$store.saved_recipes.length = 0;
        this.$store.saved_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>