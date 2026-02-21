
function Lobby() {
    const players = [
        { name: 'Taren', points: 10000, blameRatio: '100/0' },
        { name: 'Leon', points: 0, blameRatio: '0/100' },
        { name: 'Miguel', points: 5, blameRatio: '5/2' },
        { name: 'Nakul', points: 6, blameRatio: '3/1' },
        { name: 'Daniel', points: 88, blameRatio: '1/651981' },
    ]

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
                                <th className='border border-primary px-4 py-2'>Blame/Don't</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.name}>
                                    <td className='border border-primary px-4 py-2'>{player.name}</td>
                                    <td className='border border-primary px-4 py-2 text-center'>{player.points}</td>
                                    <td className='border border-primary px-4 py-2 text-center'>{player.blameRatio}</td>
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
