import mongoose, { Document, Schema } from 'mongoose';

export interface ISchedule {
    name: string;
    clase: string;
    start: number;
    duration: number;
}

export interface IScheduleModel extends ISchedule, Document {}

const ScheduleSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        clase: { type: String, required: true },
        start: { type: Number, required: true },
        duration: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IScheduleModel>('schedule', ScheduleSchema);
