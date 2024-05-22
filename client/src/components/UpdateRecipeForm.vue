<script setup>
import { computed, ref } from "vue";
import { recipesService } from "../services/RecipesService.js";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";

const activeRecipe = computed(() => AppState.activeRecipe)
const router = useRouter()
const route = useRoute()


const recipeData = ref({
  title: '',
  instructions: '',
  img: '',
  category: '',
})

function resetForm() {
  recipeData.value = { title: '', instructions: '', img: '', category: '' }
}

async function updateRecipe() {
  try {

    const recipeToUpdate = await recipesService.updateRecipe(activeRecipe.value.id, recipeData.value)
    resetForm()

    recipeData.value = {
      title: '',
      instructions: '',
      img: '',
      category: ''
    }

    Modal.getOrCreateInstance('#UpdateRecipeForm').hide()

    Pop.toast("Recipe Updated!", 'success')
    console.log(recipeToUpdate)
    // router.push({ name: 'TowerEvents', params: { eventId: newRecipe.id } })

  } catch (error) {
    Pop.toast("Couldn't Update Recipe", 'error')
    logger.error(error)
  }

}


</script>


<template>



  <div class="modal fade" id="UpdateRecipeForm" tabindex="-1" aria-labelledby="UpdateRecipeFormLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="UpdateRecipeFormLabel">Create a new Recipe!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="updateRecipe()">

            <div class="form-floating mb-3">
              <input type="text" v-model="recipeData.title" class="form-control"
                placeholder="What's the name of your recipe?" id="recipeTitle" maxlength="500">
              <label for="recipeTitle">Recipe Title</label>
            </div>
            <div class="form-floating mb-3">
              <textarea type="text" v-model="recipeData.instructions" class="form-control"
                placeholder="Input some Instructions" id="recipeInstructions" maxlength="5000"></textarea>
              <label for="recipeInstructions">Recipe Instructions</label>
            </div>
            <div class="form-floating mb-3">
              <textarea v-model="recipeData.img" class="form-control" placeholder="Image" id="recipeImg"
                maxlength="1000"></textarea>
              <label for="recipeImg">Recipe Image</label>
            </div>
            <div class="mb-3 col-7">
              <label for="recipeCategory">Category</label>
              <select v-model="recipeData.category" id="recipeCategory" class="form-control">
                <option value="" disabled selected>Please select a Recipe Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>




            <div class="text-end">
              <button class="btn btn-success" type="submit">Submit</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>



</template>


<style lang="scss" scoped></style>