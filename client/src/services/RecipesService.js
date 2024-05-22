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
    console.log(recipeId)
    const response = await api.put(`api/recipes/${recipeId}`, recipeData)
    logger.log("Updating Recipe", response.data)
    const recipeToUpdate = new Recipe(recipeId)
    AppState.activeRecipe = recipeToUpdate
    return recipeToUpdate
  }



}



export const recipesService = new RecipesService