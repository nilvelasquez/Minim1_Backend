"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.create), Book_1.default.createBook);
router.get('/:bookId', Book_1.default.readBook);
router.get('/get/:bookTitle', Book_1.default.readAuthor);
router.get('/', Book_1.default.readAll);
router.get('/get/projection', Book_1.default.readAllA);
router.put('/:bookId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.update), Book_1.default.updateBook);
router.delete('/:bookId', Book_1.default.deleteBook);
module.exports = router;
