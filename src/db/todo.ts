import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:{type:String,requried:true},
    is_completed:{type:Boolean,default:false}
});

export const TodoModel = mongoose.model("Todo",TodoSchema);

export const getTodos = () => TodoModel.find();
export const getTodoById = (id:string) => TodoModel.findById(id);
export const createTodo = (values:Record<string,any>) => new TodoModel(values)
    .save().then((todo) => todo.toObject());
export const deleteTodo = (id:string) => TodoModel.findByIdAndUpdate(id);
export const updateTodo = (id:string,values:Record<string,any>) => TodoModel.findByIdAndUpdate(id,values);