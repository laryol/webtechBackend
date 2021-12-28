import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('vacation_list', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.string('user_email').references('email').inTable('users').onDelete('CASCADE')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('vacation_list');
}