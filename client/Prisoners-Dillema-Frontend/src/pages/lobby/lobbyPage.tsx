
function Lobby() {
    return (
        <div className='flex bg-tertiary h-screen w-screen p-8'>
            <div className='flex gap-8 w-full h-full'>
                <div className='bg-secondary rounded-lg p-6 flex flex-col h-full'>
                    <h3 className='text-xl font-bold mb-4 text-black'>Players in the lobby:</h3>
                    <ul className='text-black space-y-2'>
                        <li className="border border-primary p-2 rounded">Player 1</li>
                        <li className="border border-primary p-2 rounded">Player 2</li>
                        <li className="border border-primary p-2 rounded">Player 3</li>
                    </ul>
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
