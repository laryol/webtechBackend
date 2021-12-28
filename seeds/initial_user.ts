import { Knex } from "knex";
import axios from "axios";



axios.get(`'https://webtechbackend.herokuapp.com/api'`,{headers: {'Access-Control-Allow-Origin': '*'}})
    .then(response => console.log(response.data))

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vacation").del();
    await knex("vacation_list").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            email: "max.mustermann@gmail.com",
            password: "1234"
        },
        {
            email: "huehne@htw-berlin.de",
            password: "hunter2"
        },
    ]);
}

