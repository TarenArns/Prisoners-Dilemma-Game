interface PlayerPanelProps {
    playerName: string;
    bgColor: string;
    avatarBgColor: string;
}

function PlayerHalfScreen({ playerName, bgColor, avatarBgColor }: PlayerPanelProps) {
    return (
        <div className={`w-1/2 flex flex-col items-center justify-center ${bgColor}`}>
            <div className={`w-32 h-32 rounded-full ${avatarBgColor} mb-6 text-center`}>{playerName}</div>
            <button className='mb-2 px-6 py-2 bg-tertiary rounded'>Blame</button>
            <button className='px-6 py-2 bg-tertiary rounded'>Don't Blame</button>
        </div>
    )
}

export default PlayerHalfScreen
