import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cocktails'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary().unique()
      table.string('name').notNullable()
      table.integer('category_id')
      .unsigned()
      .references('id').inTable('categories')
      .notNullable()
      table.string('instruction')

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}