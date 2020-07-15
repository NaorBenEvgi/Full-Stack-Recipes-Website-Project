<template>
  <b-container>
    <!-- <h3 class="subtitle">
      {{ title }}:
      <slot></slot>
    </h3> -->
    {{sortBy}}
    <b-row  v-for="r in recipes" :key="r.id">
      <b-col style="padding-left:98px;">
        <RecipePreview class="recipePreview" :title="title"  :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewUserList",
  components: {
    RecipePreview
  },
  data() {
    return {
      sorted: false
    };
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    },
    sortBy: {
      type: Array,
      required: false
    },
  },
  methods: {
    sortByTime(a, b) {
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
    sortByPopularity(a, b) {
      const A = a.popularity;
      const B = b.popularity;
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else if (A < B) {
        comparison = -1;
      }
      return comparison;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
