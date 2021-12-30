import {Knex} from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vacation").del();

    // Inserts seed entries
    await knex("vacation").insert([
        {
            id: "619632eb-bb64-4bfc-a11e-b511658c6a7b",
            vacation_list_id: "e7174595-173a-4e5e-8a18-3420e3026324",
            vacation_name: "Hello Germany",
            country_name: "Germany",
            start_date: "2021-01-01",
            end_date: "2021-01-07"
        }
        ,
        {
            id:"8ca973bc-ef85-47a7-be1b-22f7f8a1d06d",
            vacation_list_id: "e7174595-173a-4e5e-8a18-3420e3026324",
            vacation_name: "Hello Brazil",
            country_name: "Brazil",
            start_date: "2021-01-08",
            end_date: "2021-01-15"
        },
        {
            id:"821543ab-a7fb-4e0c-88bc-3539e6ed2ec0",
            vacation_list_id: "863915d7-eea2-43c8-ae5a-1fb43c329553",
            vacation_name: "Hello Norway",
            country_name: "Norway",
            start_date: "2021-01-01",
            end_date: "2021-01-07"
        },
        {
            id:"88edd97b-ef40-4e71-852a-781360a28deb",
            vacation_list_id: "863915d7-eea2-43c8-ae5a-1fb43c329553",
            vacation_name: "Hello Vietnam",
            country_name: "Vietnam",
            start_date: "2021-01-08",
            end_date: "2021-01-15"
        },
        {
            id:"0497a54b-f83e-4fa6-8229-a154d57af7b6",
            vacation_list_id: "863915d7-eea2-43c8-ae5a-1fb43c329553",
            vacation_name: "Hello Japan",
            country_name: "Japan",
            start_date: "2021-01-20",
            end_date: "2021-01-30"
        },
    ]);
}

