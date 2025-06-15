import Note from "../Model/Note.js";

export async function getNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savednote = await note.save();
    res
      .status(201)
      .json({ message: "Note created successfully!", note: savednote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Note updated successfully!", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  const noteId = req.params.id;
  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully!", note: deletedNote });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// This code defines the controller functions for handling notes-related requests.
// Each function corresponds to a specific action: getting all notes, creating a note, updating a note by ID, and deleting a note by ID.