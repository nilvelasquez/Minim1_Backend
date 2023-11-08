import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Schedule from '../models/Schedule';

const createSchedule = (req: Request, res: Response, next: NextFunction) => {
    const { name, clase, start, duration } = req.body;

    const schedule = new Schedule({
        _id: new mongoose.Types.ObjectId(),
        name,
        clase,
        start,
        duration
    });

    return schedule
        .save()
        .then((schedule) => res.status(201).json(schedule))
        .catch((error) => res.status(500).json(error));
};

const readSchedule = (req: Request, res: Response, next: NextFunction) => {
    const scheduleId = req.params.scheduleId;

    return Schedule.findById(scheduleId)
        .then((schedule) => (schedule ? res.status(200).json(schedule) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};
async function paginate(page: number, limit: number): Promise<any> {
    try {
        const schedules = await Schedule.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await Schedule.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ schedules, pageCount });
        return { schedules, pageCount };
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
    return Schedule.find()
        .then((schedules) => res.status(200).json(schedules))
        .catch((error) => res.status(500).json(error));
}

const updateSchedule = (req: Request, res: Response, next: NextFunction) => {
    return Schedule.findByIdAndUpdate(req.params.scheduleId, {
        name: req.body.name,
        clase: req.body.clase,
        start: req.body.start,
        duration: req.body.duration
    })
        .then((schedule) => (schedule ? res.status(201).json({ message: 'Done' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
    /* const scheduleId = req.params.scheduleId;

    return Schedule.findById(scheduleId)
        .then((schedule) => {
            if (schedule) {
                schedule.set(req.body);

                return schedule
                    .save()
                    .then((schedule) => res.status(201).json(schedule))
                    .catch((error) => res.status(500).json(error));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json(error)); */
};

const deleteSchedule = (req: Request, res: Response, next: NextFunction) => {
    const scheduleId = req.params.scheduleId;

    return Schedule.findByIdAndDelete(scheduleId)
        .then((schedule) => (schedule ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

export default { createSchedule, readSchedule, readAll, dameTodo, updateSchedule, deleteSchedule };
