import { Knex } from 'knex';

const knexConfig: Knex.Config = {
    // development: {
    client: 'sqlite3',
    connection: {
        filename: './db/settlements.db',
    },
    useNullAsDefault: true,
    // },
};

export default knexConfig;
