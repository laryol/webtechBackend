import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("expenses").del();

    // Inserts seed entries
    await knex("expenses").insert([
        {
            email: "111@test.de",
            password: "pw1"
        },
        {
            email: "222@test.de",
            password: "pw2"
        },
    ]);
}

