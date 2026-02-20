import LobbySelectButtons from '../../components/lobbySelectButtons/LobbySelectButtons'

function LobbySelect() {
  return (
    <div className="flex flex-col items-center justify-center bg-tertiary h-screen w-screen">
      <h2 className='text-3xl font-bold mb-4 text-gray-800'>Please select the type of lobby you want to join</h2>
      <text className='text-gray-600 mb-6 text-center'> you can either join a public lobby or create a private lobby and invite your friends</text>
      <LobbySelectButtons />
    </div>
  )
}

export default LobbySelect
