import express from 'express';
import { getTodos,getTodoById,createTodo,updateTodo,deleteTodo } from '../db/todo';
import {getUserBySessionToken} from '../db/users';

export const getAllTodos = async(req:express.Request,res:express.Response) => {
    try{
        const todos = await getTodos();
        return res.status(200).json(todos);

    } catch(error) {
        return res.status(400).json(error);
    }
}

export const getSingleTodo = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const todo = await getTodoById(id);
        return res.status(200).json(todo);
    } catch(error) {
        return res.status(400).json(error);
    }
}

export const createTodoApi = async(req:express.Request, res:express.Response) => {
    try{
        const {title,is_completed} = req.body;
        const sessionToken = req.cookies['SREJUS-AUTH'];
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!title || is_completed === undefined){
            return res.status(400).json({error:"title and is_completed are required!"});
        }
        const todo = await createTodo({
            title,
            is_completed,
            user:existingUser._id
        });

        return res.status(200).json(todo).end();
    } catch(error) {
        return res.status(400).json(error);
    }
}


export const updateTodoApi = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const updatedTodo = await updateTodo(id,data);
        return res.status(200).json(updatedTodo).end();

    } catch(error) {
        return res.status(400).json(error)
    }
}


export const deleteTodoApi = async(req:express.Request, res:express.Response) => {
    try{
        const {id} = req.params;
        const todo = await deleteTodo(id);
        return res.status(200).json({message:"Todo deleted successfully!"});
    } catch(error) {
        return res.status(400).json(error);
    }
}