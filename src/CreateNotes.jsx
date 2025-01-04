import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";
import { createNote } from "./api/Notes.js";

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
      const response = await createNote({
        content: content.trim(),
        title: title.trim(),
      });

      if (response.code === 201) {
        setContent("");
        setTitle("");

        onNoteCreated(response.data.note);
      }
    } catch (error) {
      alert("Failed to create note.");
      console.error("Error creating note:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        placeholder="Optional title"
        fullWidth
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        placeholder="Note content"
        multiline
        rows={4}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        {"Create Note"}
      </Button>
    </Box>
  );
};

CreateNotes.propTypes = {
  onNoteCreated: PropTypes.func.isRequired,
};

export default CreateNotes;
