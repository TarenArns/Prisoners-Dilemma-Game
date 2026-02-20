import { fetchRecord, addRecord } from "../database/databaseHelper.js"
import { PLAYER_TABLE } from "../database/constants.js"

export function login(user:any) {
    if(user && !fetchRecord(PLAYER_TABLE, user)) {
        addRecord(PLAYER_TABLE, {user: user})
    }
}