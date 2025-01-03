import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const CreateNotes = ({ onNoteCreated }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Content must not be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8000/notes", {
        content: content.trim(),
        title: title.trim() || null,
      });

      console.log("Response from server:", response.data);

      setContent("");
      setTitle("");
      setIsSubmitting(false);

      if (onNoteCreated && response.data && response.data.note) {
        onNoteCreated(response.data.note);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
      setIsSubmitting(false);
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
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Note"}
      </Button>
    </Box>
  );
};

CreateNotes.propTypes = {
  onNoteCreated: PropTypes.func.isRequired,
};

export default CreateNotes;
