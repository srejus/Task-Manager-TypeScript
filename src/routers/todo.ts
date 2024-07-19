import express from 'express';

import { getAllTodos,createTodoApi,updateTodoApi } from '../controllers/todo';
import { isAuthenticated } from '../middlewares';

export default(router:express.Router) => {
    router.get('/todos',getAllTodos);
    router.post('/todos/create',isAuthenticated,createTodoApi);
    router.put('/todos/:id',isAuthenticated,updateTodoApi);
}

