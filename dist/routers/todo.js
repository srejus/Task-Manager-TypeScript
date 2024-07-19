"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../controllers/todo");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/todos', todo_1.getAllTodos);
    router.post('/todos/create', middlewares_1.isAuthenticated, todo_1.createTodoApi);
    router.put('/todos/:id', middlewares_1.isAuthenticated, todo_1.updateTodoApi);
};
