import PlayerPanel from '../../components/game/PlayerHalfScreen'
import RoundHistory from '../../components/game/StatsTable'

function Game() {
    return (
        <div className='flex h-screen w-screen relative'>
            <PlayerPanel playerName='p1' bgColor='bg-primary' avatarBgColor='bg-secondary' />
            <RoundHistory />
            <PlayerPanel playerName='p2' bgColor='bg-secondary' avatarBgColor='bg-primary' />
        </div>
    )
}

export default Game
