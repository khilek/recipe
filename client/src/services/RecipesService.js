import { AppState } from "../AppState.js"
import { Recipe } from "../models/Recipe.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class RecipesService {

  async getRecipes() {
    const response = await api.get("api/recipes")
    logger.log("Getting Recipes", response.data)
    const recipes = response.data.map(recipeData => new Recipe(recipeData))
    AppState.recipes = recipes
  }

}

export const recipesService = new RecipesService