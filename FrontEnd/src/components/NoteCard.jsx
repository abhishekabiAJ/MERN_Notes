import { PenSquare, PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../libs/utils";
import api from "../libs/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setnotes }) => {
  const HandleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are You sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully!");
      setnotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      toast.error("Failed to Delete Note!");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 hover:border-b-4 hover:shadow-lg transition-all duration-200 ease-in-out
    border-t-4 border-solid border-primary hover:border-secondary"
    >
      <div className="card-body">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="line-clamp-3 text-base-content/70">{note.content}</p>
        <div className="card-actions justify-between mt-4 items-center">
          <span className="text-sm text-base-content/50">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => HandleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
