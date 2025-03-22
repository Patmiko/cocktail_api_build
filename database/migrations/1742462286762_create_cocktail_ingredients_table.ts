import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cocktail_ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('cocktail_id')
        .unsigned()
        .references('id').inTable('cocktails')
        .notNullable()
        .onDelete('CASCADE')
      
      table
        .integer('ingredient_id')
        .unsigned()
        .references('id').inTable('ingredients')
        .notNullable()
        .onDelete('CASCADE')
      
      table.string("amount").notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}