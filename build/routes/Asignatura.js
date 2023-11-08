"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Asignatura_1 = __importDefault(require("../controllers/Asignatura"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.asignatura.create), Asignatura_1.default.createAsignatura);
router.get('/get/:asignaturaId', Asignatura_1.default.readAsignatura);
router.patch('/update/:asignaturaId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.asignatura.update), Asignatura_1.default.updateAsignatura);
router.delete('/delete/:asignaturaId', Asignatura_1.default.deleteAsignatura);
module.exports = router;
