
function Game() {
    return (
        <div className='flex h-screen w-screen'>
            <div className='w-1/2 flex flex-col items-center justify-center bg-primary'>
                <div className='w-32 h-32 rounded-full bg-secondary mb-6 text-center'>p1</div>
                {/* TODO: change button lables */}
                <button className='mb-2 px-6 py-2 bg-tertiary rounded'>Blame</button>
                <button className='px-6 py-2 bg-tertiary rounded'>Don't Blame</button>
            </div>
            <div className='w-1/2 flex flex-col items-center justify-center bg-secondary'>
                <div className='w-32 h-32 rounded-full bg-primary mb-6 text-center'>p2</div>
                {/* TODO: change button lables */}
                <button className='mb-2 px-6 py-2 bg-tertiary rounded'>Blame</button>
                <button className='px-6 py-2 bg-tertiary rounded'>Don't Blame</button>
            </div>
        </div>
    )
}

export default Game
