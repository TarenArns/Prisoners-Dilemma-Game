function LobbySelectButtons() {
    return (
        <div className='lobbySelectContainer flex flex-col gap-4'>
            <button className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Join Public Lobby</button>
            <button className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Join Private Lobby</button>
            <button className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Create Private Lobby</button>
        </div>
    );
}

export default LobbySelectButtons;