import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Asignatura from '../models/Asignatura';
import User from '../models/User';

const createAsignatura = (req: Request, res: Response, next: NextFunction) => {
    const { name, schedule } = req.body;

    const asignatura = new Asignatura({
        _id: new mongoose.Types.ObjectId(),
        name,
        schedule
    });

    return asignatura
        .save()
        .then((asignatura) => res.status(201).json(asignatura))
        .catch((error) => res.status(500).json(error));
};

const readAsignatura = (req: Request, res: Response, next: NextFunction) => {
    const asignaturaId = req.params.asignaturaId;

    return Asignatura.findById(asignaturaId)
        .then((asignatura) => (asignatura ? res.status(200).json(asignatura) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

async function paginate(page: number, limit: number): Promise<any> {
    try {
        const asignaturas = await Asignatura.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await Asignatura.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ asignaturas, pageCount });
        return { asignaturas, pageCount };
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
    return Asignatura.find()
        .then((asignaturas) => res.status(200).json(asignaturas))
        .catch((error) => res.status(500).json(error));
};

const updateAsignatura = (req: Request, res: Response, next: NextFunction) => {
    const asignaturaId = req.params.asignaturaId;

    return Asignatura.findById(asignaturaId)
        .then((asignatura) => {
            if (asignatura) {
                asignatura.set(req.body);

                return asignatura
                    .save()
                    .then((asignatura) => res.status(201).json(asignatura))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json(error));
};

const deleteAsignatura = (req: Request, res: Response, next: NextFunction) => {
    const asignaturaId = req.params.asignaturaId;

    return Asignatura.findByIdAndDelete(asignaturaId)
        .then((asignatura) => (asignatura ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const getAllAsignaturasByUser = async (userId: string) => {
    const responseItem = await User.findOne({ _id: userId }).populate('asignatura');
    return responseItem;
};

const getAsignaturasOfUser = async (req: Request, res: Response) => {
    try {
        const idUser = req.params.id;
        console.log(idUser);
        const response = await getAllAsignaturasByUser(idUser);
        const data = response ? response : 'NOT_FOUND';
        res.send(data);
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default { createAsignatura, readAsignatura, readAll, dameTodo, updateAsignatura, deleteAsignatura, getAsignaturasOfUser };
