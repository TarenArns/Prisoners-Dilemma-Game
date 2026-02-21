import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";

interface PlayerPanelProps {
    playerName: string;
    bgColor: string;
    avatarBgColor: string;
    isClient: boolean;
}

function PlayerHalfScreen({ playerName, bgColor, avatarBgColor, isClient }: PlayerPanelProps) {

    const socket = useSocket()
    const [waiting, setWaiting] = useState<boolean>(false)
    

    function sendAction(action: boolean) {
        socket?.emit('action', action)
        setWaiting(true)
    }

    useEffect(() => {
        socket?.on('gameState', (data) => {
            setWaiting(false)
        }
        )
        return () => {
            socket?.off('gameState');
        };
    }, [socket]);

    return (
        <div className={`w-1/2 flex flex-col items-center justify-center ${bgColor}`}>
            <div className={`w-32 h-32 rounded-full ${avatarBgColor} mb-6 text-center`}>{playerName}</div>
            {isClient &&
                <div className="flex flex-col items-center justify-center">
                    <button onClick={() => sendAction(true)} disabled={waiting} className='mb-2 px-6 py-2 bg-tertiary rounded hover:bg-red-500 transition-colors'>Defect</button>
                    <button onClick={() => sendAction(true)} disabled={waiting} className='px-6 py-2 bg-tertiary rounded hover:bg-green-500 transition-colors'>Colude</button>
                </div>
            }

        </div>
    )
}

export default PlayerHalfScreen

