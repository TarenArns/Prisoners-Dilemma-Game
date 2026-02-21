import PlayerPanel from '../../components/game/PlayerHalfScreen'
import RoundHistory from '../../components/game/StatsTable'

function Game() {
    return (
        <div className='flex h-screen w-screen relative'>
            <PlayerPanel playerName='YOU' bgColor='bg-primary' avatarBgColor='bg-secondary' isClient={true} />
            <RoundHistory />
            <PlayerPanel playerName='OPPONANT' bgColor='bg-secondary' avatarBgColor='bg-primary' isClient={false} />
        </div>
    )
}

export default Game
