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
      favorites_recipes: []
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
          this.$root.store.base_url+"/users/favorites",
          //"https://recipes-web-project.herokuapp.com/users/favorites",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.favorites_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>