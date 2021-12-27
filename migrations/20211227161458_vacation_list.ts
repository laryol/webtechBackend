import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('vacation_list', function (table) {
            table.uuid('id').primary();
            table.string('user_email').references('email').inTable('users')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('vacation_list');
}

