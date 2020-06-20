<template>
  <div class="container">
    <h1 class="title">Family Recipes Page</h1>
    <b-card  v-for="r in family_recipes" :key="r.id" no-body class="overflow-hidden" style="max-width: 1040px; margin: 30px">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="r.image" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="r.title" :sub-title="r.author">
            <b-card-text>
              This family recipe is usually made at: {{ r.recommended_time}}
              Ingredients:
              <ul>
                <li
                  v-for="(ingredient, index) in r.ingredients"
                  :key="index + '_' + r.id"
                >{{ ingredient }}</li>
              </ul>Instructions:
              <ol>
                <li v-for="s in r.instructions" :key="s">{{ s }}</li>
              </ol>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      family_recipes: [],
    };
  },
  created() {
    this.updateFamilyRecipes();
  },
  methods: {
    async updateFamilyRecipes() {
      try {
        const response = await this.axios.get(
          //         this.$root.store.base_url+"/recipes/random";
          "https://recipes-web-project.herokuapp.com/users/familyRecipes",
          { withCredentials: true }
        );
        const recipes = response.data;
        //this.random_recipes = [];
        this.family_recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style>
</style>