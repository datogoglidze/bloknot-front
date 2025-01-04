import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const ReadNotes = ({ notes, onDelete }) => {
  const validNotes = Array.isArray(notes) ? notes : [];

  if (!validNotes.length) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center">
        No notes available.
      </Typography>
    );
  }

  return (
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
        {validNotes.map((note) => {
          if (!note || typeof note !== "object") return null;

          return (
            <TableRow key={note.id || "unknown"}>
              <TableCell>{note.title || "No Title"}</TableCell>
              <TableCell>{note.content || "No Content"}</TableCell>
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

export default ReadNotes;
