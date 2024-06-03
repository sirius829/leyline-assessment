import knex from 'knex';
import knexfile from '../../knexfile';

const knexInstance = knex(knexfile);

export const initTable = () => {
    knexInstance.schema.hasTable('settlements').then((exists: any) => {
        if (!exists) {
            return knexInstance.schema.createTable('settlements', (table: any) => {
                table.increments('id').primary();
                table.float('amount');
                table.string('status');
            });
        }
    });
}