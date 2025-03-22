import type { HttpContext } from '@adonisjs/core/http'
import Cocktail from '#models/cocktail'

export default class CocktailsController {
    public async index({request}:HttpContext){
        const query = Cocktail.query().preload('category').preload('ingredients')

        // Filtering
        const name = request.input('name')
        const category_id = request.input('category_id')
        const isalcoholic = request.input('isalcoholic')
        if (name) {
          query.where('name', 'like', `%${name}%`)
        }
        if (category_id) {
          query.where('category_id', category_id)
        }
        if (isalcoholic !== undefined) {
            if (isalcoholic === '1') {
              query.whereHas('ingredients', (ingredientQuery) => {
                ingredientQuery.where('alcohol', 1)
              })
            } else if (isalcoholic === '0') {
              query.whereDoesntHave('ingredients', (ingredientQuery) => {
                ingredientQuery.where('alcohol', 1)
              })
            }
          }
        // Ordering
        try{
            const orderBy = request.input('orderBy', 'name') // Default order: name
            const orderDirection = request.input('orderDirection', 'asc') // Default: ascending
            query.orderBy(orderBy, orderDirection)
            return query
        }
        catch{
            return {message:"Wrong ordering parameters"}
        }
    }
    public async show({ params} : HttpContext){
        const cocktail = await Cocktail.query().where('id',params.id).preload('ingredients').preload('category')
        
        if(!cocktail.at(0)){return {message:"No such element"}}// Check if element exists
        return cocktail;

    }
    public async update({ request} : HttpContext){
            if (!request.input('id')){return{message:"You need to provide id"}}
            const cocktail = await Cocktail.find(request.input('id'))
            if (cocktail){
                if (request.input('name')){cocktail.name = request.input('name')}
                if (request.input('instruction')){cocktail.instruction = request.input('instruction')}
                if (request.input('category_id')){cocktail.category_id = request.input('category_id')}

                try{
                    
                    if (await cocktail.save()){return cocktail}

                }
                catch{
                    return {message:"Invalid category"}
                }
                return; // 422
            }
            return; // 401
        }
    
        public async store({ request} : HttpContext){
            const cocktail = new Cocktail();
            cocktail.name = request.input('name')
            cocktail.instruction = request.input('instruction')
            cocktail.category_id = request.input('category_id')

           
    
            
            if ([request.input('name'),request.input('instruction'),request.input('category_id')].some(value => !value) ){
                return {
                    message:"Some of the values have not been provided"
                }
            }
            try{
                    
                if (await cocktail.save()){return cocktail}

            }
            catch{
                return {message:"Invalid category"}
            }
            
        }
    
        public async destroy({params}: HttpContext){
    
            const cocktail = await Cocktail.query().where('id',params.id).delete()
            console.log(cocktail)
            return {message:"Deleted succesfully"}  
        }
}