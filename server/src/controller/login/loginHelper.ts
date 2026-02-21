import { fetchRecord, addRecord } from "../../services/database/databaseHelper.js"

export function login(user: string) {
    try {
        if(user && !fetchRecord(PLAYER_TABLE, user)) {
            addRecord(PLAYER_TABLE, {"user": user})
            return true
        }
    }
    catch(error) {
        console.log(error)
    }
  }
  catch (error) {
    console.log(error)
  }

  return false
}
