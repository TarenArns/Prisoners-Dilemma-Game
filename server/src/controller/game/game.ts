import { Game } from '../../services/index.js'
import { SINGLE_PLAYER } from './constants.js'
import { PrisType } from '../../constants/bots.js'

import { addRecord } from '../../services/database/databaseHelper.js'

export function createGame(type: string) {
    const game = new Game()

    if(type == SINGLE_PLAYER) {
        game.addPrisoner(PrisType.cooperator, "bot")
        game.addPrisoner(PrisType.defecator, "bot")
        game.addPrisoner(PrisType.random, "bot")
        game.addPrisoner(PrisType.tit4tat, "bot")

        addRecord("bot1")
        addRecord("bot2")
        addRecord("bot3")
        addRecord("bot4")
    }

    return game
}