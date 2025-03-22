import type { HttpContext } from '@adonisjs/core/http'
import Ingredient from '#models/ingredient'
import app from '@adonisjs/core/services/app';
import path from 'path';

export default class IngredientsController {

    public async index({}: HttpContext){
        const ingredients = await Ingredient.query();
        return ingredients
    }
    
    public async show({ params} : HttpContext){
            const ingredient = await Ingredient.find(params.id)
            if (ingredient){return ingredient}
            return{message:"No such element"};
    }

    public async update({ request} : HttpContext){
        if (!request.input('id')){return{message:"You need to provide id"}}
        const ingredient = await Ingredient.find(request.input('id'))
        const avatar = request.file('image',{
            size: '2mb',
            extnames: ['jpg', 'png']
          })
        const baseUrl = `${request.protocol()}://${request.hostname()}:${process.env.PORT || 3333}`
        if (ingredient){
            if (request.input('name')){ingredient.name = request.input('name')}
            if (request.input('description')){ingredient.description = request.input('description')}
            if (request.input('alcohol')){
                if (request.input('alcohol') == "0"){ingredient.alcohol = false}
                else {ingredient.alcohol = true}
            }
            if (avatar){
                await avatar?.move('public/uploads/',{
                    name: `${ingredient.id}.jpg`,
                    overwrite: true, 
                })
                ingredient.image_url = baseUrl +`/ingredients/images/${ingredient.id}.jpg`;
            }

            if (await ingredient.save()){
                return ingredient
            }
            return; // 422
        }
        return; // 401
    }

    public async store({ request} : HttpContext){
        const avatar = request.file('image',{
            size: '2mb',
            extnames: ['jpg', 'png']
          })
          
        
        const ingredient = new Ingredient();
        const baseUrl = `${request.protocol()}://${request.hostname()}:${process.env.PORT || 3333}`
        ingredient.name = request.input('name')
        ingredient.description = request.input('description')
        if (request.input('alcohol')){
                if (request.input('alcohol') == "0"){ingredient.alcohol = false}
                else {ingredient.alcohol = true}
            }
        if (!avatar || avatar == undefined){
            ingredient.image_url = baseUrl + `/ingredients/images/default.jpg`
        }        
        
        if ([request.input('name'),request.input('description'),request.input('alcohol')].some(value => !value) ){
            return {
                message:"Some of the values have not been provided"
            }
        }
        await ingredient.save()
        if (avatar) {
            await avatar.move('public/uploads/',{
                name: `${ingredient.id}.jpg`,
                overwrite: true, 
            })
            ingredient.image_url = baseUrl +`/ingredients/images/${ingredient.id}.jpg`;
            await ingredient.save()
          } else{
            await ingredient.save()
          }       
        return ingredient
    }

    public async destroy({params}: HttpContext){

        const ingredient = await Ingredient.query().where('id',params.id).delete()
        console.log(ingredient)
        return {message:"Deleted succesfully"}  
    }
    public async getimg({response,params} :HttpContext){
        const absolutePath = path.join(app.publicPath('uploads'), params.id)

        return response.download(absolutePath)
    }
}