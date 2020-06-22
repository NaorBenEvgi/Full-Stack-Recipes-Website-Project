<template>
  <div class="container">
    <h1 class="title">Personal Recipes Page</h1>
    <RecipePreviewList
      title="Personal Recipes"
      class="RandomRecipes center"
      :recipes="personal_recipes"
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
      personal_recipes: []
    };
  },
  mounted() {
    this.updatePersonalRecipes();
  },
  methods: {
    async updatePersonalRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url+"/users/personalRecipes",
          //"https://recipes-web-project.herokuapp.com/users/personalRecipes",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.personal_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>