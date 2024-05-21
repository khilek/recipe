<script setup>
import { Recipe } from "../models/Recipe.js";



defineProps({ recipe: { type: Recipe, required: true } })
</script>


<template>
  <div class=" card text-bg-dark mt-3">
    <img :src="recipe.img" class="recipe-img" alt="food image">
    <div class="top-left bg-dark rounded-pill w-25 text-center text-light">{{ recipe.category }}</div>
    <div class="card p-3">
      <h5 class="card-title text-center  ">
        {{ recipe.title }}
      </h5>
      <p class="card-text"><small> </small></p>
      <p></p>

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