import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/LoginPage';
import LobbySelect from './pages/lobbySelect/LobbySelectPage';

function App() {
  return (
    <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />'
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />'
      <Route path="/lobbySelect" element={<LobbySelect />} />'
    </Routes>
  );
}

export default App;
