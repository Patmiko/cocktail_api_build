import AuthController from '#controllers/auth_controller'
import IngredientsController from '#controllers/ingredients_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import CategoriesController from '#controllers/categories_controller'
import CocktailsController from '#controllers/cocktails_controller'
import CocktailIngredientsController from '#controllers/cocktail_ingredients_controller'

router.get('/', async () => {
  return 'This is my attempt to build something in AdonisJs. The process was time consuming and trecherous but in the end some(if not most) of the functionality is in place. I decided to break down the database into some smaller chunks. Tables of ingredients and categories are there to avoid duplication of data. Cocktail Ingredients was made to make it easier to connect many ingredients to single cocktail. This solution ufortunately forces us to make many api calls. In the end it was pretty fun to do some stuff in Adonis (mainly due to testing and naming different cocktails).'
})

router.group(() => {
  router.get("ingredients/images/:id", [IngredientsController,'getimg'])
  router.group(() => {
        router.post('register', [AuthController, 'register'])
        router.post("generatetoken", [AuthController, 'generatetoken'])
  

        router.group(() => {
        router.delete("/:id",[CocktailsController, 'destroy']).where('id', {match: /^[0-9]+$/,})
        router.get("/:id", [CocktailsController, 'show']).where('id', {match: /^[0-9]+$/,})
        router.get("/", [CocktailsController, 'index'])
        router.put("/update", [CocktailsController, 'update'])
        router.post("/", [CocktailsController, 'store'])
      }).use(middleware.auth({
        guards: ['api']
      })).prefix("cocktails")

      router.group(() => {
        router.delete("/:id",[CategoriesController, 'destroy']).where('id', {match: /^[0-9]+$/,})
        router.get("/:id", [CategoriesController, 'show']).where('id', {match: /^[0-9]+$/,})
        router.get("/", [CategoriesController, 'index'])
        router.put("/update", [CategoriesController, 'update'])
        router.post("/", [CategoriesController, 'store'])
      }).use(middleware.auth({
        guards: ['api']
      })).prefix("categories")

      router.group(() => {
        router.delete("/:id",[IngredientsController, 'destroy']).where('id', {match: /^[0-9]+$/,})
        router.get("/:id", [IngredientsController, 'show']).where('id', {match: /^[0-9]+$/,})
        router.get("/", [IngredientsController, 'index'])
        router.put("/update", [IngredientsController, 'update'])
        router.post("/", [IngredientsController, 'store'])
      }).use(middleware.auth({
        guards: ['api']
      })).prefix("ingredients")

      router.group(() => {
        router.delete("/:id",[CocktailIngredientsController, 'destroy']).where('id', {match: /^[0-9]+$/,})
        router.get("/:id", [CocktailIngredientsController, 'show']).where('id', {match: /^[0-9]+$/,})
        router.get("/cocktail/:id", [CocktailIngredientsController, 'showbycocktail']).where('id', {match: /^[0-9]+$/,})
        router.get("/", [CocktailIngredientsController, 'index'])
        router.put("/update", [CocktailIngredientsController, 'update'])
        router.post("/", [CocktailIngredientsController, 'store'])
      }).use(middleware.auth({
        guards: ['api']
      })).prefix("cocktail_ingredients")



}).prefix("api")})