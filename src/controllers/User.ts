import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, asignatura } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        password,
        email,
        asignatura
    });

    return user
        .save()
        .then((user) => res.status(201).json(user))
        .catch((error) => res.status(500).json(error));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json(user) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

async function paginate(page: number, limit: number): Promise<any> {
    try {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await User.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ users, pageCount });
        return { users, pageCount };
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
    return User.find()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json(error));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { name, password, email, asignatura } = req.body;
    const user = new User({
        name,
        password,
        email,
        asignatura
    });
    console.log(user);
    return User.findByIdAndUpdate(userId, { name: user.name, password: user.password, email: user.email, asignatura: user.asignatura })
        .then((userOut) => (userOut ? res.status(200).json(user) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
    /* return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then((user) => 
                        res.status(201).json(user))
            
                    .catch((error) => {
                        console.log("save", error);
                        res.status(500).json(error);
                    });
                    
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json(error)); */
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

export default { createUser, readUser, readAll, updateUser, deleteUser, dameTodo };
