import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ingredient from './ingredient.js'
import Cocktail from './cocktail.js'
export default class CocktailIngredient extends BaseModel {

  @column({ isPrimary: true })
    declare id: number

  @column()
  declare cocktail_id: number // Foreign key as a number

  @belongsTo(() => Cocktail,{
    foreignKey:"cocktail_id"
  })
  public cocktail!: BelongsTo<typeof Cocktail>



  @column()
  declare ingredient_id: number // Foreign key as a number
  @belongsTo(() => Ingredient,{
      foreignKey:"ingredient_id"
    })
    public ingredient!: BelongsTo<typeof Ingredient>



  @column()
  declare amount:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}