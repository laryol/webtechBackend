import crypto from "crypto";
import { Knex } from "knex";

type Vacation = {
    id: string;
    vacation_list_id: string;
    vacation_name: string;
    country_name: string;
    start_date: Date;
    end_date: Date;
};

type SavedVacation = Vacation & {
    id: string;
};

class VacationService {
    vacation: SavedVacation[] = [];
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    async getVacation(uuid: string): Promise<void>{
        await this.knex("vacation").where({id: uuid})
    }

    async add(vacation: Vacation): Promise<SavedVacation> {
        const newVacation = {
            ...vacation,
            id: crypto.randomUUID(),
        };
        await this.knex("vacation").insert(newVacation);
        return newVacation;
    }

    async delete(uuid: string): Promise<void> {
        await this.knex("vacation").where({ id: uuid }).delete();
    }

    async getAll(): Promise<Vacation[]> {
        return this.knex("vacation");
    }

}

export default VacationService;