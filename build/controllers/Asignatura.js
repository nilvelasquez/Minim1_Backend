"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Asignatura_1 = __importDefault(require("../models/Asignatura"));
const createAsignatura = (req, res, next) => {
    const { name, schedule } = req.body;
    const asignatura = new Asignatura_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        schedule
    });
    return asignatura
        .save()
        .then((asignatura) => res.status(201).json({ asignatura }))
        .catch((error) => res.status(500).json({ error }));
};
const readAsignatura = (req, res, next) => {
    const asignaturaId = req.params.asignaturaId;
    return Asignatura_1.default.findById(asignaturaId)
        .then((asignatura) => (asignatura ? res.status(200).json({ asignatura }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const updateAsignatura = (req, res, next) => {
    const asignaturaId = req.params.asignaturaId;
    return Asignatura_1.default.findById(asignaturaId)
        .then((asignatura) => {
        if (asignatura) {
            asignatura.set(req.body);
            return asignatura
                .save()
                .then((asignatura) => res.status(201).json({ asignatura }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteAsignatura = (req, res, next) => {
    const asignaturaId = req.params.asignaturaId;
    return Asignatura_1.default.findByIdAndDelete(asignaturaId)
        .then((asignatura) => (asignatura ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createAsignatura, readAsignatura, updateAsignatura, deleteAsignatura };
