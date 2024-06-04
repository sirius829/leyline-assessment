import { Request, Response } from "express";
import knex from 'knex';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knexfile from '../../knexfile';
import dotenv from 'dotenv';

dotenv.config();
const knexInstance = knex(knexfile);

export const Register = async (req: Request, res: Response) => {
    try {
        const { username, password, type } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await knexInstance('users')
            .insert({ username, password: hashedPassword, type })
            .then(() => res.sendStatus(200))
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: error.message })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        await knexInstance('users')
            .where({ username })
            .first()
            .then(async (row: any) => {
                if (row) {
                    const isMatch = await bcrypt.compare(password, row.password);
                    if (!isMatch) {
                        return res.status(401).send({ error: 'Invalid password' });
                    }
                    const token = jwt.sign({ id: row.id, username: row.username, type: row.type }, process.env.JWT_SECRET ?? "secret");
                    return res.json({ token });
                } else {
                    return res.status(400).send({ error: 'No such user' });
                }
            })
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}