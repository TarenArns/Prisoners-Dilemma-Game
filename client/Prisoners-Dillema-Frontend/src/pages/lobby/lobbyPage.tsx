import { useEffect } from "react"
import { useSocket } from "../../hooks/useSocket"

function Lobby() {
    const players: any[] = []

    const socket = useSocket()

    useEffect(() => {
        socket?.emit('playerStatsAll')
        socket?.on('playerStatsAll_success', (data: any) => {
            console.log(data)
            data.forEach((player: any) => {
                players.push({
                    name: player.playerName,
                    points: player.points,
                })
            })
        })
    }, []);

    useEffect(() => {
        socket?.on('playerStatsAll_success', (data: any) => {
            console.log(data)
            data.forEach((player: any) => {
                players.push({
                    name: player.playerName,
                    points: player.points,
                })
            })
        })
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
                            {players.map((player) => (
                                <tr key={player.name}>
                                    <td className='border border-primary px-4 py-2'>{player.name}</td>
                                    <td className='border border-primary px-4 py-2 text-center'>{player.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-3xl font-bold mb-4 text-gray-800'>You're in the lobby now</h2>
                    <p className='text-gray-600'>wait for the host to start the game. if you are the host, please start the game man, wer are all waiting</p>
                    <button className='mt-4 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded w-32'>
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lobby
