import express from 'express';

import { getUser } from '../db/users';

export const getAllUsers = async(req:express.Request,res:express.Response) => {
    try{
        const users = await getUser();
        return res.status(200).json(users);

    } catch(error) {
        return res.status(400).json(error);
    }
}