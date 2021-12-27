import crypto from "crypto";
import { Knex } from "knex";

type Vacation = {
    date: Date;
    name: string;
    value: number;
};

type SavedVacation = Vacation & {
    id: string;
};

class VacationService {
    expenses: SavedVacation[] = [];
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    async add(expense: Vacation): Promise<SavedVacation> {
        const newVacation = {
            ...expense,
            id: crypto.randomUUID(),
        };
        await this.knex("expenses").insert(newVacation);
        return newVacation;
    }

    async delete(uuid: string): Promise<void> {
        await this.knex("expeses").where({ id: uuid }).delete();
    }

    async getAll(): Promise<Vacation[]> {
        return this.knex("expenses");
    }

    async getTotal(): Promise<number> {
        const response = await this.knex<SavedVacation>("expenses")
            .sum("value")
            .first();
        return response?.sum || 0;
    }
}

export default VacationService;