<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { recipesService } from "../services/RecipesService.js";



const recipes = computed(() => AppState.recipes)


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
      <div class="col">
        <h1>RECIPE</h1>
      </div>
    </section>
  </div>
  <div class="container">
    <section class="row card flex-row  align-items-center">
      <div role="button" class="col-4 d-flex justify-content-evenly selectable p-2">
        <h2>HOME</h2>
      </div>
      <div role="button" class="col-4 d-flex justify-content-evenly selectable">
        <h2>My Recipes</h2>
      </div>
      <div role="button" class="col-4 d-flex justify-content-evenly selectable">
        <h2>RECIPES</h2>
      </div>
    </section>
  </div>

  <div class="container">
    <section class="row ">
      <div class="col-3 align-self-center" role="button" data-bs-toggle="modal" data-bs-target="#recipeCardModal"
        v-for="recipe in recipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
        <!-- <button type="button" class="btn btn-primary">
          Launch demo modal
        </button> -->
      </div>
    </section>
  </div>

  <RecipeCardModal />
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



.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
