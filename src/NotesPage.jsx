import { useEffect, useState } from "react";
import { deleteNote, getNotes } from "./api/Notes.js";
import { Box, Card, Container, Typography } from "@mui/material";
import CreateNotes from "./CreateNotes.jsx";
import ReadNotes from "./ReadNotes.jsx";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    getNotes()
      .then((notes) => setNotes(notes))
      .catch((error) => console.log("Could not retrieve notes", error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = () => {
    fetchNotes();
  };

  const handleNoteDelete = async (noteId) => {
    await deleteNote(noteId);
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
