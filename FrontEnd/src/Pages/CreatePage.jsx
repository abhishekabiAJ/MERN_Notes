import React from "react";
import toast from "react-hot-toast";
import api from "../libs/axios.js"
import { Navigate, useNavigate } from "react-router";


const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if(error.response.status === 429){
        toast.error("Slow down! You are creating too fast")
      }
      else{
        toast.error("Failed to create note");
      }
      console.log("Error Creating Note:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-base-300 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label htmlFor="title" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    className="input input-bordered w-full"
                    placeholder="Enter note title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Enter note content"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
