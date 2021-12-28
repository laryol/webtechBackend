import {Knex} from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vacation").del();
    await knex("vacation_list").del();

    // Inserts seed entries
    await knex("vacation_list").insert([
        {id: "e7174595-173a-4e5e-8a18-3420e3026324", user_email: "max.mustermann@gmail.com"},
        {id: "863915d7-eea2-43c8-ae5a-1fb43c329553", user_email: "huehne@htw-berlin.de"}
    ]);
}
