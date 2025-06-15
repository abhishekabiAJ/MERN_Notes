import express from 'express';
const router = express.Router();
import { getNotes,getNoteById, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
// This code defines the routes for the notes API using Express.js.
// It imports the necessary modules, sets up the router, and defines the routes for getting, creating, updating, and deleting notes.