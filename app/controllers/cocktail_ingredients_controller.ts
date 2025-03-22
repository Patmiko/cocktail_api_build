import type { HttpContext } from '@adonisjs/core/http'
import CocktailIngredient from "#models/cocktail_ingredient";

export default class CocktailIngredientsController {
    public async index({}:HttpContext){
            return await CocktailIngredient.query().preload('ingredient').preload('cocktail')
        }
        public async show({ params} : HttpContext){
            const cocktailingredient = await CocktailIngredient.query().where('id',params.id).preload('ingredient').preload('cocktail')
            if(!cocktailingredient.at(0)){return {message:"No such element"}}// Check if element exists
            return cocktailingredient;
    
        }
        public async showbycocktail({ params} : HttpContext){
            const cocktailingredient = await CocktailIngredient.query().where('cocktail_id',params.id).preload('ingredient').preload('cocktail')
            if(!cocktailingredient.at(0)){return {message:"No such element"}}// Check if element exists
            return cocktailingredient;
    
        }
        public async update({ request} : HttpContext){
            if (!request.input('id')){return{message:"You need to provide id"}}
                const cocktailingredient = await CocktailIngredient.find(request.input('id'))
                if (cocktailingredient){
                    if (request.input('amount')){cocktailingredient.amount = request.input('amount')}
    
                    try{
                        if (await cocktailingredient.save()){return cocktailingredient}
    
                    }
                    catch{
                        return {message:"Error while saving"}
                    }
                    return; // 422
                }
                return; // 401
            }
        
            public async store({ request} : HttpContext){
            
                const cocktailingredient = new CocktailIngredient();
                cocktailingredient.cocktail_id = request.input('cocktail_id')
                cocktailingredient.ingredient_id = request.input('ingredient_id')
                cocktailingredient.amount = request.input('amount')
        
                
                if ([request.input('cocktail_id'),request.input('ingredient_id'),request.input('amount')].some(value => !value) ){
                    return {
                        message:"Some of the values have not been provided"
                    }
                }
                try{
                    await cocktailingredient.save()      
                }
                catch{
                    return {message:"Error while saving(Check cocktail/ingredient id)"}
                }
                return cocktailingredient
            }
        
            public async destroy({params}: HttpContext){
        
                const cocktailingredient = await CocktailIngredient.query().where('id',params.id).delete()
                console.log(cocktailingredient)
                return {message:"Deleted succesfully"}  
            }
}