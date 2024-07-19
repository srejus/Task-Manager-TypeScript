import express from 'express';
import authentication from './authentication';
import users from './users';
import todo from './todo';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    todo(router);

    return router
};