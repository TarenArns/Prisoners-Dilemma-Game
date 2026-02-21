import { Game } from '../../services/index.js'
import { SINGLE_PLAYER } from './constants.js'
import { PrisType } from '../../constants/bots.js'

import { addRecord } from '../../services/database/databaseHelper.js'

export function createGame(type: string) {
    const game = new Game()

    if(type == SINGLE_PLAYER) {
        game.addPrisoner("bot1", PrisType.cooperator)
        game.addPrisoner("bot2", PrisType.defecator)
        game.addPrisoner("bot3", PrisType.random)
        game.addPrisoner("bot4", PrisType.tit4tat)

        addRecord("bot1")
        addRecord("bot2")
        addRecord("bot3")
        addRecord("bot4")
    }

    return game
}