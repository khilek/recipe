<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { recipesService } from "../services/RecipesService.js";
import { Recipe } from "../models/Recipe.js";


// defineProps({ recipe: { type: Recipe, required: true } })
const activeRecipe = computed(() => AppState.activeRecipe)
const account = computed(() => AppState.account)
// const route = useRoute()

async function eraseRecipe(recipeId) {
  try {

    const wantsToErase = await Pop.confirm('Are you sure you want to Erase?', 'There is no undoing this...', 'ERASE', "question")

    if (!wantsToErase) return

    logger.log('ERASING RECIPE', AppState.activeRecipe.id)

    await recipesService.eraseRecipe(recipeId)

  } catch (error) {
    Pop.toast("Couldn't Erase Recipe")
    logger.error(error)
  }


}

// NO ON MOUNTED IN THE MODAL NEEDED
// onMounted(() => {
//   getRecipeById()
// })
</script>


<template>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="recipeCardModal" tabindex="-1" aria-labelledby="recipeCardModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content" v-if="activeRecipe">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="recipeCardModalLabel">{{ activeRecipe.title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-6">
                <!-- FIXME REFERENCE ART TERMINAL FOR GETTING RECIPE IN MODALS -->
                <img class="img-fluid" :src="activeRecipe.img" alt="Recipe-Image">
              </div>
              <div class="col-6 d-flex justify-content-evenly">
                {{ activeRecipe.instructions }}

              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-start w-100">
            <button @click="eraseRecipe(AppState.activeRecipe.id)" class=" btn btn-outline-danger"
              title="Full Send!">Erase</button>
          </div>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          <h2><i role="button" title="Update a Recipe!" data-bs-toggle="modal" data-bs-target="#UpdateRecipeForm"
              class="mdi mdi-plus-circle p-3"></i></h2>
        </div>
      </div>
    </div>
  </div>
  <UpdateRecipeForm />
</template>


<style lang="scss" scoped>
.recipe-img {
  height: 100%;
  width: 100%;
  object-fit: contain;

}
</style>