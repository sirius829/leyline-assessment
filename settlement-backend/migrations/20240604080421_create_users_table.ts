import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.integer('type').notNullable().defaultTo(0);   //0: partyA, 1: partyB
        table.string('password').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

