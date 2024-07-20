"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoApi = exports.updateTodoApi = exports.createTodoApi = exports.getSingleTodo = exports.getAllTodos = void 0;
const todo_1 = require("../db/todo");
const users_1 = require("../db/users");
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, todo_1.getTodos)();
        return res.status(200).json(todos);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getAllTodos = getAllTodos;
const getSingleTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield (0, todo_1.getTodoById)(id);
        return res.status(200).json(todo);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.getSingleTodo = getSingleTodo;
const createTodoApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, is_completed } = req.body;
        const sessionToken = req.cookies['SREJUS-AUTH'];
        const existingUser = yield (0, users_1.getUserBySessionToken)(sessionToken);
        if (!title || is_completed === undefined) {
            return res.status(400).json({ error: "title and is_completed are required!" });
        }
        const todo = yield (0, todo_1.createTodo)({
            title,
            is_completed,
            user: existingUser._id
        });
        return res.status(200).json(todo).end();
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.createTodoApi = createTodoApi;
const updateTodoApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedTodo = yield (0, todo_1.updateTodo)(id, data);
        return res.status(200).json(updatedTodo).end();
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.updateTodoApi = updateTodoApi;
const deleteTodoApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield (0, todo_1.deleteTodo)(id);
        return res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.deleteTodoApi = deleteTodoApi;
