import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Asignatura from '../models/Asignatura';
import Faq from '../models/FAQ';

const createFaq = (req: Request, res: Response, next: NextFunction) => {
    const { numero, question, answer, asignatura } = req.body;

    const faq = new Faq({
        _id: new mongoose.Types.ObjectId(),
        numero,
        question,
        answer,
        asignatura
    });

    return faq
        .save()
        .then((faq) => res.status(201).json(faq))
        .catch((error) => res.status(500).json(error));
};

const readFaq = (req: Request, res: Response, next: NextFunction) => {
    const faqId = req.params.faqd;

    return Faq.findById(faqId)
        .then((faq) => (faq ? res.status(200).json(faq) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

async function paginate(page: number, limit: number): Promise<any> {
    try {
        const faqs = await Faq.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await Faq.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ faqs, pageCount });
        return { faqs, pageCount };
    } catch (err) {
        console.log(err);
        return err;
    }
}

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    console.log({ page, limit });
    // Comprueba si page y limit son números válidos
    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send({ error: 'Invalid page or limit' });
    }

    console.log({ page, limit });
    const response = await paginate(Number(page), Number(limit));
    res.send(response);
};

const dameTodo = (req: Request, res: Response, next: NextFunction) => {
    return Faq.find()
        .then((faqs) => res.status(200).json(faqs))
        .catch((error) => res.status(500).json(error));
};

const updateFaq = (req: Request, res: Response, next: NextFunction) => {
    const faqId = req.params.faqId;

    return Faq.findById(faqId)
        .then((faq) => {
            if (faq) {
                faq.set(req.body);

                return faq
                    .save()
                    .then((faq) => res.status(201).json(faq))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json(error));
};

const deleteFaq= (req: Request, res: Response, next: NextFunction) => {
    const faqId = req.params.faqId;

    return Faq.findByIdAndDelete(faqId)
        .then((faq) => (faq ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};


export default { createFaq, readFaq, readAll, dameTodo, updateFaq, deleteFaq};
