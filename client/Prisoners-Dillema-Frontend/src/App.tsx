import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/LoginPage';
import LobbySelect from './pages/lobbySelect/LobbySelectPage';
import Lobby from './pages/lobby/lobbyPage';
import Game from './pages/game/gamePage';
function App() {
  return (
    <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />'
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />'
      <Route path="/lobbySelect" element={<LobbySelect />} />'
      <Route path="/lobby" element={<Lobby />} />'
      <Route path="/game" element={<Game />} />'
    </Routes>
  );
}

export default App;
