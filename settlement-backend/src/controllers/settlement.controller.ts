import { Request, Response } from "express";
import knex from 'knex';
import knexfile from '../../knexfile';

const knexInstance = knex(knexfile);

export const submitSettlement = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        await knexInstance('settlements')
            .insert({ amount, status: null })
            .then(() => res.sendStatus(200))
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        console.error(error);
        res.status(500).send({ error: error.message })
    }
};

export const respondSettlement = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        await knexInstance('settlements')
            .update({ status })
            .then(() => res.sendStatus(200))
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

export const getAmount = async (req: Request, res: Response) => {
    try {
        await knexInstance('settlements')
            .orderBy('id', 'desc')
            .first()
            .then((row: any) => res.json({ amount: row?.amount }))
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}

export const getResponse = async (req: Request, res: Response) => {
    try {
        await knexInstance('settlements')
            .orderBy('id', 'desc')
            .first()
            .then((row: any) => res.json({ status: row?.status }))
            .catch((error: any) => res.status(500).send({ error: error.message }));
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
}