"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .createTable('expenses', function (table) {
        table.uuid('id').primary();
        table.date('date').notNullable();
        table.string('name', 255).notNullable();
        table.integer('value').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .dropTableIfExists('expenses');
}
exports.down = down;
