import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import NotesPage from "./Notes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
