import { fetchRecord, addRecord } from "../../services/database/databaseHelper.js"

export async function login(user: string) {
    try {
        if(user && !(await fetchRecord(user))) {
            addRecord({"user": user})
            return true
        }
    }
    catch(error) {
        console.log("ERROR IN LOGIN:" + error)
    }

    return false
}