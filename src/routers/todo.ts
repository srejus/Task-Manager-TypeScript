import express from 'express';

import { getAllTodos,createTodoApi,updateTodoApi, deleteTodoApi } from '../controllers/todo';
import { isAuthenticated } from '../middlewares';

export default(router:express.Router) => {
    router.get('/todos',getAllTodos);
    router.post('/todos/create',isAuthenticated,createTodoApi);
    router.put('/todos/:id',isAuthenticated,updateTodoApi);
    router.delete('/todos/:id',isAuthenticated,deleteTodoApi);
}

