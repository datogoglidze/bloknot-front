import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes } from "../api/Notes.js";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const CreateNote = ({ onNoteCreated }) => {
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
      alert(error.message || "Failed to create note.");
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
        autoComplete="off"
        variant="outlined"
        placeholder="Optional title"
        fullWidth
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoComplete="off"
        variant="outlined"
        placeholder="Note content"
        multiline
        rows={4}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Create Note
      </Button>
    </Box>
  );
};

CreateNote.propTypes = {
  onNoteCreated: PropTypes.func.isRequired,
};

const ReadNotes = ({ notes, onDelete }) => {
  const [selectedNote, setSelectedNote] = useState("");

  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length <= 10) return content;
    return words.slice(0, 10).join(" ") + "...";
  };

  if (!notes.length) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center">
        No notes available.
      </Typography>
    );
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note) => {
            if (!note || typeof note !== "object") return null;

            const contentWords = note.content ? note.content.split(" ") : [];
            const isLongContent = contentWords.length > 10;

            return (
              <TableRow key={note.id}>
                <TableCell>{note.title || "Untitled"}</TableCell>
                <TableCell>
                  {isLongContent ? (
                    <Button
                      onClick={() => setSelectedNote(note)}
                      sx={{ textAlign: "left", textTransform: "none" }}
                    >
                      {truncateContent(note.content)}
                    </Button>
                  ) : (
                    note.content
                  )}
                </TableCell>
                <TableCell>
                  {note.date
                    ? new Date(parseInt(note.date) * 1000).toLocaleString(
                        "en-GB",
                        {
                          hour12: false,
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "No Date"}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(note.id)}
                    aria-label="delete"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog
        open={Boolean(selectedNote)}
        onClose={() => setSelectedNote("")}
        scroll={"paper"}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle variant="h5">
          {selectedNote.title || "Untitled"}
        </DialogTitle>
        <IconButton
          onClick={() => setSelectedNote("")}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            whiteSpace: "pre-wrap",
            textAlign: "justify",
            m: 2,
          }}
          dividers={true}
        >
          {selectedNote.content}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setSelectedNote("")}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ReadNotes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      date: PropTypes.string,
    }),
  ),
  error: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

ReadNotes.defaultProps = {
  notes: [],
  error: null,
};

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
          <CreateNote onNoteCreated={handleNoteCreated} />
        </Card>
        <Card sx={{ width: "100%", p: 3 }}>
          <ReadNotes notes={notes} onDelete={handleNoteDelete} />
        </Card>
      </Box>
    </Container>
  );
};

export default NotesPage;
