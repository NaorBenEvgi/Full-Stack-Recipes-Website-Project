<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>Ingredients:
            <ul>
              <li v-for="(r, index) in recipe.ingredients" :key="index + '_' + recipe.id">{{ r }}</li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s">{{ s }}</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      >-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        console.log(this.$route.params.title);
        console.log(this.$root.store.username);

        if (this.$route.params.title === "Personal Recipes") {
          response = await this.axios.get(
            `https://recipes-web-project.herokuapp.com/users/personalRecipes/${this.$route.params.recipeId}`
          );
        } else {
          response = await this.axios.get(
            `https://recipes-web-project.herokuapp.com/recipes/${this.$route.params.recipeId}`
          );
        }
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.recipe = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    this.createLastWatch();
  },
  methods: {
    async updateLastSeenRecipes() {
      try {
        const response = await this.axios.get(
          "https://recipes-web-project.herokuapp.com/users/lastWatched",
          { withCredentials: true }
        );
        const recipes = response.data;
        this.$store.watched_items.length = 0;
        this.$store.watched_items.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async createLastWatch() {
      if (this.$root.store.username) {
        try {
          const response2 = await this.axios.post(
            "https://recipes-web-project.herokuapp.com/users/watched",
            {
              recipeId: this.$route.params.recipeId
            }
          );
          this.updateLastSeenRecipes();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
