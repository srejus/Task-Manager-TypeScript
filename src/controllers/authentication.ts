import express from 'express';

import {getuserByEmail,createUser} from '../db/users';
import { authentication, random } from '../helpers';

export const register = async(req: express.Request, res: express.Response) => {
    try {
        const {email,password, username} = req.body;
        if(!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser =  await getuserByEmail(email);

        if(existingUser) {
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        })
        return res.status(200).json(user).end();
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const login = async (req: express.Request, res:express.Response) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getuserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) {
            return res.status(400).json({error:"User is not existed!"});
        }

        console.log('user.authentication.salt:'+user.authentication.salt)
        const expectedHash = authentication(user.authentication.salt,password);

        if(user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt,user._id.toString());

        await user.save();

        res.cookie('SREJUS-AUTH',user.authentication.sessionToken,{domain: 'localhost',path:'/'});
        
        return res.status(200).json({user}).end();
    } catch(error) {
        return res.status(400).json(error);
    }
}