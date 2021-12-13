"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    client: "postgresql",
    connection: {
        host: 'redis-15713.c135.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 15713
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
};
exports.default = config;
