import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, required:true, select: false},
        sessionToken: {type: String, select: false},
    },
});

export const UserModel = mongoose.model('User',userSchema);


export const getUser = () => UserModel.find();

export const getuserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values)
    .save().then((user) => user.toObject());