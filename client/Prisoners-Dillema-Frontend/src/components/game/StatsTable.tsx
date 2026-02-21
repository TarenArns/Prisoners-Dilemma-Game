function StatsTable() {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tertiary rounded-lg shadow-lg p-4'>
            <table className='border-collapse'>
                <thead>
                    <tr>
                        <th className='border border-primary px-4 py-2'>Round</th>
                        <th className='border border-primary px-4 py-2'>P1</th>
                        <th className='border border-primary px-4 py-2'>P2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-primary px-4 py-2 text-center'>1</td>
                        <td className='border border-primary px-4 py-2 text-center'>Blame</td>
                        <td className='border border-primary px-4 py-2 text-center'>Blame</td>
                    </tr>
                    <tr>
                        <td className='border border-primary px-4 py-2 text-center'>2</td>
                        <td className='border border-primary px-4 py-2 text-center'>Don't Blame</td>
                        <td className='border border-primary px-4 py-2 text-center'>Blame</td>
                    </tr>
                    <tr>
                        <td className='border border-primary px-4 py-2 text-center'>3</td>
                        <td className='border border-primary px-4 py-2 text-center'>Blame</td>
                        <td className='border border-primary px-4 py-2 text-center'>Don't Blame</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatsTable
