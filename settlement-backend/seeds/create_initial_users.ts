import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    const passwordA = await bcrypt.hash("passwordA", 10);
    const passwordB = await bcrypt.hash("passwordB", 10);

    await knex('users').insert([
        { username: 'partyA', password: passwordA, type: 0 },
        { username: 'partyB', password: passwordB, type: 1 }
    ]);
};
