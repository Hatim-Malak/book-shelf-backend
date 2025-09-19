import express from "express"
import { addBooks,editBooks,allBooks,deleteBook,oneBook } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/all",allBooks)
router.post("/add",addBooks)
router.put("/edit/:id",editBooks)
router.delete("/delete/:id",deleteBook)
router.get("/one/:id",oneBook)

export default router;