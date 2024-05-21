<script setup>
import { Recipe } from "../models/Recipe.js";
import { recipesService } from "../services/RecipesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";



defineProps({ recipe: { type: Recipe, required: true } })


async function getRecipeById(recipeId) {
  try {
    await recipesService.getRecipeById(recipeId)
  }
  catch (error) {
    Pop.toast("Couldn't Get Recipe By Id", 'error');
    logger.error(error)
  }
}

</script>


<template>
  <div class=" card text-bg-dark mt-3">
    <img :src="recipe.img" class="recipe-img" alt="food image">
    <div class="top-left bg-dark rounded-pill w-25 text-center text-light">{{ recipe.category }}</div>
    <div class="card p-3">
      <h5 class="card-title text-center  " role="button" data-bs-toggle="modal" data-bs-target="#recipeCardModal"
        @click="getRecipeById(recipe.id)">
        {{ recipe.title }}
      </h5>
      <p class="card-text"><small> </small></p>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.recipe-img {
  height: 100%;
  width: 100%;
  object-fit: contain;

}

.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}
</style>