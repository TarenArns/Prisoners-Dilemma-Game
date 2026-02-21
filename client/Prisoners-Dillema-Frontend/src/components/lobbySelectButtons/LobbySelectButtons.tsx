import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LobbySelectButtons() {
    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLobbyJoined = () => {
            navigate("/lobby");
        };

        socket?.on('join_success', handleLobbyJoined);
        socket?.on('join_failed', () => {
            alert(`Failed to join lobby`);
        }
        )
        return () => {
            socket?.off('lobbyJoined', handleLobbyJoined);
        };
    }, [socket, navigate]);

    function handleJoinPublicLobby() {
        socket?.emit('join', 'single');
    }


    return (
        <div className='lobbySelectContainer flex flex-col gap-4'>
            <button onClick={handleJoinPublicLobby} className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Join Public Lobby</button>
            {/* <button className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Join Private Lobby</button>
            <button className='lobbySelectButton px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors'>Create Private Lobby</button> */}
        </div>
    );
}

export default LobbySelectButtons;
