import LobbySelectButtons from '../../components/lobbySelectButtons/LobbySelectButtons'

function LobbySelect() {
  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <h2>Please select the type of lobby you want to join</h2>
      <text> you can either join a public lobby or create a private lobby and invite your friends</text>
      <LobbySelectButtons />
    </div>
  )
}

export default LobbySelect
