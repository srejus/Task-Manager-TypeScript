import express from 'express';
import {get, identity, merge} from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async(req:express.Request, res:express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['SREJUS-AUTH'];
        console.log('Session Token : ',sessionToken);
        
        if(!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        console.log('User : ',existingUser);
        if(!existingUser) {
            return res.sendStatus(403)
        }

        merge(req, {identity: existingUser});
        return next();
    } catch(error) {
        res.sendStatus(403);
    }
}