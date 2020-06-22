<template>
  <!-- <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.popularity }} likes</li>
      </ul>
  </div>-->
  <b-card bg-variant="light" img-top tag="article" style="max-width: 20rem;" class="mb-2">
    <router-link :to="{ name: 'recipe', params: { recipeId: this.recipe.id, title: title } }">
      <b-card-img :src="recipe.image" style="max-width: 20rem;"></b-card-img>
    </router-link>
    <b-card-body>
      <router-link :to="{ name: 'recipe', params: { recipeId: this.recipe.id, title: title } }">
        <b-card-title>{{recipe.title}}</b-card-title>
      </router-link>
      <b-card-text>
        <p class="h6 mb-2">
          <b-icon icon="hand-thumbs-up" font-scale="1.3"></b-icon>
          {{ recipe.popularity }} likes
        </p>
        <p class="h6 mb-2">
          <b-icon icon="clock-fill" font-scale="1"></b-icon>
          {{ recipe.readyInMinutes }} minutes
        </p>
        <p v-if="recipe.vegvegetarianan" class="h6 mb-2">
          <b-icon icon="check2-circle" font-scale="1"></b-icon>vegetarian
        </p>
        <p v-if="recipe.vegan" class="h6 mb-2">
          <b-icon icon="check2-circle" font-scale="1"></b-icon>vegan
        </p>
      </b-card-text>
    </b-card-body>
    <a v-if="this.recipes_info[0] && this.recipes_info[0][this.recipe.id].watched" class="h2 mb-2">
      <b-icon icon="clock-history" ></b-icon>
    </a>
    <a v-if="this.recipes_info[0] && !this.recipes_info[0][this.recipe.id].saved" aria-hidden="true" @click="markAsFavorite" class="h2 mb-2">
      <b-icon icon="heart"></b-icon>
    </a>
    <a v-else class="h2 mb-2">
      <b-icon icon="heart-fill"></b-icon>
    </a>
  </b-card>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      // image_load: false
      recipes_info: []
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    info: {
      type: Object
    }
  },
  created() {
    this.getRecipeInfo();
  },
  methods: {
    async getRecipeInfo() {
      console.log(this.recipe.id);
      try {
        const response = await this.axios.get(
           this.$root.store.base_url+`/users/recipesInfo/[${this.recipe.id}]`,
          //`https://recipes-web-project.herokuapp.com/users/recipesInfo/[${this.recipe.id}]`,
          { withCredentials: true }
        );
        const info = response.data;
        this.recipes_info.length = 0;
        this.recipes_info.push(info);
      } catch (error) {
        console.log(error);
      }
    },
    async markAsFavorite() {
      try {
        const response = await this.axios.post(
           this.$root.store.base_url+"/users/favorites",
          //`https://recipes-web-project.herokuapp.com/users/favorites`,
          {
            recipeId: this.recipe.id
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.getRecipeInfo();
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
