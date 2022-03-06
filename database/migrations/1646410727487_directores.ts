import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Directores extends BaseSchema {
  protected tableName = 'directores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('persona_id').unsigned().references('id').inTable('personas')
      table.integer('pelicula_id').unsigned().references('id').inTable('peliculas')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { precision: 6 }).nullable()
      table.timestamp('updated_at', { precision: 6 }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
