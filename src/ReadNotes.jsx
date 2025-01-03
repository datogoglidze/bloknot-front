import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

const ReadNotes = ({ notes, error }) => {
  const validNotes = Array.isArray(notes) ? notes : [];

  if (error) {
    return (
      <Typography variant="body1" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

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
          <TableCell>ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Content</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {validNotes.map((note) => {
          if (!note || typeof note !== "object") return null;

          return (
            <TableRow key={note.id || "unknown"}>
              <TableCell>{note.id || "N/A"}</TableCell>
              <TableCell>{note.title || "No Title"}</TableCell>
              <TableCell>{note.content || "No Content"}</TableCell>
              <TableCell>
                {note.date
                  ? new Date(parseInt(note.date) * 1000).toLocaleString()
                  : "No Date"}
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
};

ReadNotes.defaultProps = {
  notes: [],
  error: null,
};

export default ReadNotes;
