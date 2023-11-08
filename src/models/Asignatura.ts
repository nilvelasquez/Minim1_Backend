import mongoose, { Document, Schema } from 'mongoose';
import { ISchedule } from './Schedule';

export interface IAsignatura {
    name: string;
    schedule: ISchedule[];
}

export interface IAsignaturaModel extends IAsignatura, Document {}

const AsignaturaSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        schedule: [{ type: Schema.Types.ObjectId, required: false, ref: 'schedule' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAsignaturaModel>('asignatura', AsignaturaSchema);
