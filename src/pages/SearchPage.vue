<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <b-form-input v-model="query" id="query" placeholder="Search for any dish..." required></b-form-input>
      <b>Number of results:</b>
      <b-form-select v-model="amount_selected" id="amount" :options="amounts"></b-form-select>
      <h5>Popular Recipe Categories:</h5>
      <b>Diet:</b>
      <b-form-select v-model="diet_selected" id="diet" :options="diet" class="mb-3"></b-form-select>
      <b>Cuisine:</b>
      <b-form-select v-model="cuisine_selected" id="cuisine" :options="cuisine"></b-form-select>
      <b>Intolerance:</b>
      <b-form-select v-model="intolerance_selected" id="intolerance" :options="intolerance"></b-form-select>
      <b-button type="submit" variant="info">search</b-button>
      <b-form-group label="Sort the results:" v-if="responsed_recipes">
        <b-form-radio-group name="radio-button" v-model="selected_sorts" :options="sorts" switches></b-form-radio-group>
        <b-button variant="secondary" @click="sortHandle">Sort!</b-button>
      </b-form-group>
    </b-form>
    <RecipePreviewList
      title="Search Recipes"
      class="RandomRecipes center"
      :recipes="responsed_recipes"
    ></RecipePreviewList>
  </div>
</template>
<script>
import diet from "../assets/diets";
import cuisine from "../assets/cuisines";
import intolerance from "../assets/intolerances";
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "Search",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      search: false,
      query: "",
      diet: [{ value: null, text: "-none-" }],
      cuisine: [{ value: null, text: "-none-" }],
      intolerance: [{ value: null, text: "-none-" }],
      amounts: [
        // { value: null, text: "Amount of results", disabled: true },
        { value: "5", text: 5 },
        { value: "10", text: 10 },
        { value: "15", text: 15 }
      ],
      errors: [],
      validated: false,
      amount_selected: 5,
      diet_selected: null,
      cuisine_selected: null,
      intolerance_selected: null,
      //   RecipePreviewListSearchKey: 0,
      responsed_recipes: this.$store.search_items,
      selected_sorts: [],
      sorts: [
        { text: "Time", value: "time" },
        { text: "Popularity", value: "popularity" }
      ]
    };
  },
  mounted() {
    console.log(this.selected_sorts);
    this.intolerance.push(...intolerance);
    this.diet.push(...diet);
    this.cuisine.push(...cuisine);
  },
  // updated(){
  //   if (this.selected_sorts.length > 0 && this.selected_sorts.includes("time")) {
  //     this.responsed_recipes.sort(this.sortByTime);
  //   }
  //   if (this.selected_sorts.length > 0 && this.selected_sorts.includes("popularity")) {
  //     this.responsed_recipes.sort(this.sortByPopularity);
  //   }
  //   this.selected_sorts = [];
  // },
  methods: {
    async searchRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url+`/recipes/search/query/${this.query}/amount/${this.amount_selected}`,
          //`https://recipes-web-project.herokuapp.com/recipes/search/query/${this.query}/amount/${this.amount_selected}`,
          { withCredentials: true }
        );
        const recipes = response.data;
        this.responsed_recipes.push(...recipes);
        this.$store.search_items.length = 0;
        this.$store.search_items.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    onSearch() {
      this.search = true;
      this.searchRecipes();
    },
    compareByTime(a, b) {
      const timeA = a.readyInMinutes;
      const timeB = b.readyInMinutes;
      let comparison = 0;
      if (timeA > timeB) {
        comparison = 1;
      } else if (timeA < timeB) {
        comparison = -1;
      }
      return comparison;
    },
    compareByPopularity(a, b) {
      const A = a.popularity;
      const B = b.popularity;
      let comparison = 0;
      if (A > B) {
        comparison = -1;
      } else if (A < B) {
        comparison = 1;
      }
      return comparison;
    },
    sortByTime() {
      console.log("here");
      this.responsed_recipes.sort(this.compareByTime);
    },
    sortByPopularity() {
      this.responsed_recipes.sort(this.compareByPopularity);
    },
    sortHandle() {
      if (
        this.selected_sorts.length > 0 &&
        this.selected_sorts.includes("time")
      ) {
        this.sortByTime();
      }
      if (
        this.selected_sorts.length > 0 &&
        this.selected_sorts.includes("popularity")
      ) {
        this.sortByPopularity();
      }
    }
  }
};
</script>