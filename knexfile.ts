import { Knex } from "knex"
const config: Knex.Config = {
    client: "postgresql",
    connection: "postgresql://knut@localhost:5432/expenses",
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
};
export default config;