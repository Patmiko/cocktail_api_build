import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column , manyToMany} from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Ingredient from './ingredient.js'

export default class Cocktail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @belongsTo(() => Category,{
    foreignKey:"id",   
     
  })
  public category_ids!: BelongsTo<typeof Category>

  @column()
  declare category_id: number // Foreign key as a number

  @belongsTo(() => Category, {
    
    foreignKey: 'category_id', // Link to category_id
  })
  public category!: BelongsTo<typeof Category>



  @column()
  declare instruction: string

  @manyToMany(() => Ingredient, {
    pivotTable: 'cocktail_ingredients', // The join table
    pivotColumns: ['amount'], // Include the amount from pivot table
    localKey: 'id',
    pivotForeignKey: 'cocktail_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'ingredient_id',
  })
  public ingredients!: ManyToMany<typeof Ingredient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}