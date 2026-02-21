import { fetchRecord, addRecord } from "../../services/database/databaseHelper.js"

export function login(user: string) {
  try {
    if (user && !fetchRecord(user)) {
      addRecord({ username: user })
      return true
    }
  }
  catch (error) {
    console.log(error)
  }

  return false
}
