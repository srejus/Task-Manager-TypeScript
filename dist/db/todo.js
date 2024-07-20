"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.createTodo = exports.getTodoById = exports.getTodos = exports.TodoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: { type: String, requried: true },
    is_completed: { type: Boolean, default: false },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.TodoModel = mongoose_1.default.model("Todo", TodoSchema);
const getTodos = () => exports.TodoModel.find();
exports.getTodos = getTodos;
const getTodoById = (id) => exports.TodoModel.findById(id);
exports.getTodoById = getTodoById;
const createTodo = (values) => new exports.TodoModel(values)
    .save().then((todo) => todo.toObject());
exports.createTodo = createTodo;
const deleteTodo = (id) => exports.TodoModel.findByIdAndDelete(id);
exports.deleteTodo = deleteTodo;
const updateTodo = (id, values) => exports.TodoModel.findByIdAndUpdate(id, values);
exports.updateTodo = updateTodo;
