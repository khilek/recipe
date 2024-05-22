import { AppState } from "../AppState.js"
import { Recipe } from "../models/Recipe.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class RecipesService {

  async createRecipe(recipeData) {
    console.log(recipeData)
    const response = await api.post('api/recipes', recipeData)
    logger.log('Creating Recipe', response.data)
    const newRecipe = new Recipe(response.data)
    AppState.recipes.push(newRecipe)
    return newRecipe
  }


  async getRecipes() {
    const response = await api.get("api/recipes")
    logger.log("Getting Recipes", response.data)
    const recipes = response.data.map(recipeData => new Recipe(recipeData))
    AppState.recipes = recipes
  }

  async getRecipeById(recipeId) {
    const response = await api.get(`api/recipes/${recipeId}`)
    logger.log("Getting Recipes By Id", response.data)
    const recipe = new Recipe(response.data)
    AppState.activeRecipe = recipe
  }


  /**
   * @param {number} recipeId
   * @param {{ title: string; instructions: string; img: string; category: string; }} recipeData
   */
  async updateRecipe(recipeId, recipeData) {
    const response = await api.put(`api/recipes/${recipeId}`, recipeData)
    logger.log("Updating Recipe", response.data)
    const recipeToUpdate = new Recipe(recipeId)
    AppState.activeRecipe = recipeToUpdate
    return recipeToUpdate
  }

  /**
   * @param {string | string[]} recipeId
   */
  async eraseRecipe(recipeId) {
    const response = await api.delete(`api/recipes/${recipeId}`)
    logger.log('Erasing Recipe', response.data)
    const recipes = AppState.recipes
    const recipeToIndex = recipes.findIndex(recipe => recipe.id == recipeId)
    if (recipeToIndex == -1) throw new Error("Couldn't find Index")
    recipes.splice(recipeToIndex, 1)
  }

}



export const recipesService = new RecipesService