<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { recipesService } from "../services/RecipesService.js";
import { useRoute } from "vue-router";

const route = useRoute()

const recipes = computed(() => AppState.recipes)
const activeRecipe = computed(() => AppState.activeRecipe)

async function getRecipes() {
  try {
    await recipesService.getRecipes()
  } catch (error) {
    Pop.toast("Couldn't get Recipes", 'error');
    logger.error(error)
  }
}


onMounted(() => {
  getRecipes()
})
</script>

<template>
  <div class="container-fluid">
    <section class="row bg-success text-center p-5 fw-bold ">
      <div class="col d-flex justify-content-center">
        <h1>RECIPE </h1>
        <h2><i role="button" title="Create a Recipe!" data-bs-toggle="modal" data-bs-target="#recipeFormModal"
            class="mdi mdi-plus-circle p-3"></i></h2>
      </div>
    </section>
  </div>
  <div class="container">
    <section class="row card flex-row  align-items-center">
      <div role="button" class="col-4 col-md-4 d-flex justify-content-evenly selectable p-2">
        <h2>HOME</h2>
      </div>
      <div role="button" class="col-4 col-md-4  d-flex justify-content-evenly selectable">
        <h2>My Recipes</h2>
      </div>
      <div role="button" class="col-4 col-md-4  d-flex justify-content-evenly selectable">
        <h2>RECIPES</h2>
      </div>
    </section>
  </div>

  <div class="container">
    <section class="row ">
      <div class="col-3 col-md-4 col-lg-3 align-self-center" v-for="recipe in recipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />

      </div>
    </section>
  </div>


  <RecipeCardModal />
  <RecipeFormModal />
</template>

<style scoped lang="scss">
.recipe-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.magic-card {
  position: relative;
  bottom: -15vh;
  min-height: 6vh;
  width: 60%;
  padding: 0;
  justify-content: center;
}



.hero-img {
  max-height: 80%;
  max-width: 100%;
  background-size: cover;
  display: block;
  object-fit: contain;
  object-position: cover;
}
</style>
