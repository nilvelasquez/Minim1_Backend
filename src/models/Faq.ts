import mongoose, { Document, Schema } from 'mongoose';
import { IAsignatura } from './Asignatura';

export interface IFaq {
    numero: number;
    question: string;
    answer: string;
    asignatura: string;
}

export interface IFaqModel extends IFaq, Document {}

const FaqSchema: Schema = new Schema(
    {
        numero: {type: Number, required:true},
        question: { type: String, required: true },
        answer: {type: String, required: true},
        asignatura: {type: String, required: true, ref: 'asignatura' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IFaqModel>('faq',FaqSchema);