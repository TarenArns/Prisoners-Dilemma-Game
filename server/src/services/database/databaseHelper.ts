import { databaseKey } from "./constants"
import { Player } from "../entity/Player"
import { AppDataSource } from "../../server"


export async function addRecord(fields: any) {
  let username = fields["username"]

  const player = new Player(username)

  await AppDataSource.manager.save(player)
}

export async function updateRecord(key: databaseKey, fields: any) {
  const playerRepository = AppDataSource.getRepository(Player)
  const playerToUpdate = await playerRepository.findOneBy({ username: key.value })
  if (!playerToUpdate) {
    console.log("User with username ${key.value} not found.")
    return
  }

  playerToUpdate.colludeCount = fields["colludeCount"]
  playerToUpdate.currentScore = fields["currentScore"]
  playerToUpdate.defectCount = fields["defectCount"]
  playerToUpdate.totalScore = fields["totalScore"]
  playerToUpdate.totalWins = fields["totalWins"]

  await playerRepository.save(playerToUpdate)

}

export async function deleteRecord(key: databaseKey, fields: any) {
  const playerRepository = AppDataSource.getRepository(Player)
  const playerToRemove = await playerRepository.findOneBy({ username: key.value })

  if (!playerToRemove) {
    console.log("User with username ${key.value} not found.")
    return
  }

  await playerRepository.remove(playerToRemove)
}

export async function fetchRecord(key: databaseKey) {
  const playerRepository = AppDataSource.getRepository(Player)
  const player = await playerRepository.findOneBy({ username: key.value })

  if (!player) {
    console.log("User with username ${key.value} not found.")
    return
  }

  return player
}
