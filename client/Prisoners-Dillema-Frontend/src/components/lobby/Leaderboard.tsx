interface LeaderboardProps {
    players: any[]
}

function Leaderboard({ players }: LeaderboardProps) {
    return (<div className='bg-secondary rounded-lg p-6 flex flex-col h-full'>
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
    )
}
export default Leaderboard