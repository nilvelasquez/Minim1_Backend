"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.create), User_1.default.createUser);
router.get('/get/:userId', User_1.default.readUser);
router.patch('/update/:userId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.update), User_1.default.updateUser);
router.delete('/delete/:userId', User_1.default.deleteUser);
module.exports = router;
