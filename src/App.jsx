import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Typography, Box } from "@mui/material";
import CreateNotes from "./CreateNotes.jsx";
import ReadNotes from "./ReadNotes.jsx";
import { deleteNote, getNotes } from "./api/Notes.js";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    getNotes()
      .then((notes) => setNotes(notes))
      .catch((error) => console.log("Could not retrieve orders", error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    console.log("New note created:", newNote);
    fetchNotes();
  };

  const handleNoteDelete = async (noteId) => {
    await deleteNote(noteId);
    console.log("Note deleted:", noteId);
    fetchNotes();
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
