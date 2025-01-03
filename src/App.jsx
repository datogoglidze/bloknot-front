import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Typography, Box } from "@mui/material";
import CreateNotes from "./CreateNotes.jsx";
import ReadNotes from "./ReadNotes.jsx";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes");
      console.log("Fetched notes:", response.data);
      if (response.data && response.data.data && response.data.data.notes) {
        setNotes(response.data.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    console.log("New note created:", newNote);
    fetchNotes();
  };

  const handleNoteDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${noteId}`);
      console.log("Note deleted:", noteId);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Notes
        </Typography>
        <Card sx={{ width: "100%", p: 3, mb: 3 }}>
          <CreateNotes onNoteCreated={handleNoteCreated} />
        </Card>
        <Card sx={{ width: "100%", p: 3 }}>
          <ReadNotes notes={notes} onDelete={handleNoteDelete} />
        </Card>
      </Box>
    </Container>
  );
};

export default NotesPage;
