import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotesPage from "./pages/Notes.jsx";

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
