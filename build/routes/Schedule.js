"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Schedule_1 = __importDefault(require("../controllers/Schedule"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.schedule.create), Schedule_1.default.createSchedule);
router.get('/get/:scheduleId', Schedule_1.default.readSchedule);
router.patch('/update/:scheduleId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.schedule.update), Schedule_1.default.updateSchedule);
router.delete('/delete/:scheduleId', Schedule_1.default.deleteSchedule);
module.exports = router;
