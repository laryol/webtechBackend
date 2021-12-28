import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('vacation', function (table) {
            table.uuid('id').primary();
            table.uuid('vacation_list_id').references('id').inTable('vacation_list').onDelete('CASCADE')
            table.string('vacation_name')
            table.string('country_name')
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('vacation');
}

