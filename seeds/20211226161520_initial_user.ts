import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vacation").del();
    await knex("vacation_list").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            email: "max.mustermann@gmail.com",
            password: "$2b$10$rzADt0dKQBISiTpVkE.3o.9dQNfSFcMCCI5bT2FiBWhiNzmgYDh8."
        },
        {
            email: "huehne@htw-berlin.de",
            password: "$2b$10$dEe.OjAOd5rc9tvfoYOGIOxTeO7ATWgmOEL9h/FbGAw/1T4MC3lPa"
        },
    ]);
}

