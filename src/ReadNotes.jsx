import "react";
import PropTypes from "prop-types";

const ReadNotes = ({ notes }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {notes.map((note) => (
                <tr key={note.id}>
                    <td>{note.id}</td>
                    <td>{note.title || "No Title"}</td>
                    <td>{note.content}</td>
                    <td>{new Date(parseInt(note.date) * 1000).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

ReadNotes.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            content: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ReadNotes;
