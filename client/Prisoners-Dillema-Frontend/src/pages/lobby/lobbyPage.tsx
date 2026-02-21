import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket"
import { useNavigate } from "react-router-dom"

function Lobby() {
    const [players, setPlayers] = useState<any[]>([])

    const socket = useSocket()
    const navigate = useNavigate()


    useEffect(() => {
        socket.emit('playerStatsAll')
    }, []);

    useEffect(() => {
        socket.on('playerStatsAll_success', (data: any) => {
           setPlayers(data)
        })
        socket.on('gameStart_success', () => {
            navigate('/game')
        })

        return () => {
            socket.off('playerStatsAll_success')
            socket.off('gameStart_success')
        }
    }, [socket]);

    return (
        <div className='flex bg-tertiary h-screen w-screen p-8'>
            <div className='flex gap-8 w-full h-full'>
                <div className='bg-secondary rounded-lg p-6 flex flex-col h-full'>
                    <h3 className='text-xl font-bold mb-4 text-black'>Players in the lobby:</h3>
                    <table className='border-collapse'>
                        <thead>
                            <tr>
                                <th className='border border-primary px-4 py-2'>Player</th>
                                <th className='border border-primary px-4 py-2'>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(players).map(([name, points]) => (
                                <tr key={name}>
                                    <td className='border border-primary px-4 py-2'>{name}</td>
                                    <td className='border border-primary px-4 py-2 text-center'>{points as number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-3xl font-bold mb-4 text-gray-800'>You're in the lobby now</h2>
                    <p className='text-gray-600'>wait for the host to start the game. if you are the host, please start the game man, wer are all waiting</p>
                    <button onClick={() => socket.emit('gameStart')} className='mt-4 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded w-32'>
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lobby
