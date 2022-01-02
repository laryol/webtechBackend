import crypto from "crypto";
import {Knex} from "knex";

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


    async getVacation(uuid: string, email: string): Promise<Vacation> {
        return this.knex("vacation as v")
            .select("v.id", "vacation_list_id", "vacation_name", "country_name", "start_date", "end_date")
            .innerJoin("vacation_list as vl", "v.vacation_list_id", "vl.id")
            .where({user_email: email}).andWhere({'v.id': uuid})
            .first();
    }

    async add(vacation: Vacation): Promise<SavedVacation> {
        const newVacation = {
            ...vacation,
            id: crypto.randomUUID(),
        };
        await this.knex("vacation").insert(newVacation);
        return newVacation;
    }

    async update(vacation: Vacation, vacationId: string): Promise<Number> {
        const newVacation = {
            ...vacation,
            id: vacationId,
        };
        return this.knex("vacation")
            .where({id: vacationId})
            .update(newVacation)
    }

    async delete(uuid: string): Promise<void> {
        await this.knex("vacation").where({id: uuid}).delete();
    }

    async getVacationList(email: string): Promise<void> {
        await this.knex("vacation_list")
            .select("id")
            .where({user_email: email})
    }

    async getAll(email: string): Promise<Vacation[]> {
        return this.knex("vacation_list")
            .select("vacation.id", "vacation_list_id", "vacation_name", "country_name", "start_date", "end_date")
            .innerJoin("vacation", "vacation_list.id", "vacation.vacation_list_id")
            .where({user_email: email})
    }

}

export default VacationService;