import mongoose, { Document, Schema } from 'mongoose';
import { IAsignatura } from './Asignatura';

export interface IUser {
    name: string;
    password: string;
    email: string;
    asignatura: string[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        asignatura: { type: [Schema.Types.ObjectId], required: false, ref: 'asignatura' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('user', UserSchema);
