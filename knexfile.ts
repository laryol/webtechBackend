require('dotenv').config()

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env

module.exports = {
    development: {
        client: CLIENT,
        connection: {
            database: DATABASE,
            user: PG_USER,
            password: PASSWORD,
            host: HOST,
            port: PG_PORT,
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}






/* import { Knex } from "knex";
//const DATABASE_URL = 22;

const config: Knex.Config = {
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:
            process.env.NODE_ENV === "production"
                ? { rejectUnauthorized: false } // allow self-signed certificate for Heroku/AWS
                : false, // if we run locally, we don't want SSL at all
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};

export default config;
*/
