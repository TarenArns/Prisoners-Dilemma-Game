import LobbySelectButtons from '../../components/lobbySelectButtons/LobbySelectButtons'
import { useSocket } from '../../hooks/useSocket'
import { useNavigate } from 'react-router-dom'



function LobbySelect() {

  const socket = useSocket()
  const navigate = useNavigate()
  socket.connect()

  function handleDisconnect() {
    socket.disconnect()
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center bg-tertiary h-screen w-screen">
      <h2 className='text-3xl font-bold mb-4 text-gray-800'>Please select the type of lobby you want to join</h2>
      <text className='text-gray-600 mb-6 text-center'> you can either join a public lobby or create a private lobby and invite your friends</text>
      <LobbySelectButtons />
      <button onClick={handleDisconnect} className='mt-6 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>choose new username</button>
    </div>
  )
}

export default LobbySelect
