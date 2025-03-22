import type { HttpContext } from '@adonisjs/core/http'
import Category from "#models/category";

export default class CategoriesController {
    public async index({}: HttpContext){
        const category = await Category.query();
        return category
    }
    
    public async show({ params} : HttpContext){
            const ingredient = await Category.find(params.id)
            if (ingredient){return ingredient}
            return{message:"No such element"};
    }

    public async update({ request} : HttpContext){
        if (!request.input('id')){return{message:"You need to provide id"}}
        const category = await Category.findOrFail(request.input('id'))
        if (category){
            if (request.input('name')){category.name = request.input('name')}
            if (request.input('description')){category.description = request.input('description')}

            if (await category.save()){
                return category
            }
            return; // 422
        }
        return; // 401
    }

    public async store({ request} : HttpContext){
    
        const category = new Category();
        category.name = request.input('name')
        category.description = request.input('description')

        
        if ([request.input('name')].some(value => !value) ){
            return {
                message:"Some of the values have not been provided"
            }
        }
        await category.save()      
        return category
    }

    public async destroy({params}: HttpContext){

        const category = await Category.query().where('id',params.id).delete()
        console.log(category)
        return {message:"Deleted succesfully"}  
    }
}