import React from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useState } from "react";
import { useEffect } from "react";
import api from "../libs/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoteNotFound from "../components/NoteNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchnotes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/notes");
        setnotes(response.data);
      } catch (error) {
        if (error.status === 404) {
          toast.error("No Note Found");
        } else if (error.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes:");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchnotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7x mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setnotes={setnotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
