import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('settlements', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.float('amount');
        table.string('status');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('settlements');
}

