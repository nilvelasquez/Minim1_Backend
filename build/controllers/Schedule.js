"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schedule_1 = __importDefault(require("../models/Schedule"));
const createSchedule = (req, res, next) => {
    const { name, clase, start, duration } = req.body;
    const schedule = new Schedule_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        clase,
        start,
        duration
    });
    return schedule
        .save()
        .then((schedule) => res.status(201).json({ schedule }))
        .catch((error) => res.status(500).json({ error }));
};
const readSchedule = (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    return Schedule_1.default.findById(scheduleId)
        .then((schedule) => (schedule ? res.status(200).json({ schedule }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const updateSchedule = (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    return Schedule_1.default.findById(scheduleId)
        .then((schedule) => {
        if (schedule) {
            schedule.set(req.body);
            return schedule
                .save()
                .then((schedule) => res.status(201).json({ schedule }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteSchedule = (req, res, next) => {
    const scheduleId = req.params.scheduleId;
    return Schedule_1.default.findByIdAndDelete(scheduleId)
        .then((schedule) => (schedule ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createSchedule, readSchedule, updateSchedule, deleteSchedule };
