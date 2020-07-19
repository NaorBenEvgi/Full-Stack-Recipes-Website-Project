<template>
  <b-container>
    <!-- <h3 class="subtitle">
      {{ title }}:
      <slot></slot>
    </h3> -->
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
