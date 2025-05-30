const express = require('express');
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controller/book.controller');
const authenticateToken = require('../middleware/jwt-token.middleware');
const router = express.Router()

router.get("/", authenticateToken, getBooks);
router.get("/:id", authenticateToken, getBook);
router.post("/", authenticateToken, createBook);
router.patch("/:id", authenticateToken, updateBook);
router.delete("/:id", authenticateToken, deleteBook);

module.exports = router;
