<script setup>
import { computed } from "vue";
import { AppState } from "../AppState.js";


const activeRecipe = computed(() => AppState.activeRecipe)


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