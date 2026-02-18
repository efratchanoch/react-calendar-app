import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from '../Calendar/Calendar/Calendar.jsx'; 

export default function App() {
  const now = new Date();
  const currentPath = `/calendar/${now.getMonth() + 1}/${now.getFullYear()}`;

  return (
    <Router>
      <Routes>
        <Route path="/calendar/:month/:year" element={<Calendar />} />
        <Route path="*" element={<Navigate to={currentPath} />} />
      </Routes>
    </Router>
  );
}