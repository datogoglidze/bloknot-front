import { useState, useEffect } from "react";
import axios from "axios";
import CreateNotes from "./CreateNotes.jsx";
import ReadNotes from "./ReadNotes.jsx";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes");
      setNotes(response.data.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  return (
      <div>
        <h1>Notes</h1>
        <CreateNotes onNoteCreated={handleNoteCreated} />
        <ReadNotes notes={notes} />
      </div>
  );
};

export default NotesPage;
