import { fetchRecordAll } from "../../services/database/databaseHelper.js";

export async function getLeaderboard() {
    const playersDB = await fetchRecordAll()
    let leaderboard = {}
    
    if (!playersDB) {
        throw new Error("PLAYER DB FAILED")
    }

    for (const player of playersDB) {
        if (player.username) {
            const score = player.totalScore ? player.totalScore : 0
            leaderboard = {...leaderboard, [player.username]: score}
        }
    }
    
    return leaderboard
}