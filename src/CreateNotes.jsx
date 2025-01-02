import  { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CreateNotes = ({ onNoteCreated }) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

     const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Content must not be empty.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/notes", {
                content,
                title: title || null,
            });
            setContent("");
            setTitle("");
            if (onNoteCreated) onNoteCreated(response.data.note);
        } catch (error) {
            console.error("Error creating note:", error);
            alert("Failed to create note.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Optional title"
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note content"
                    required
                />
            </div>
            <button type="submit">Create Note</button>
        </form>
    );
};

CreateNotes.propTypes = {
    onNoteCreated: PropTypes.func.isRequired,
};

export default CreateNotes;
