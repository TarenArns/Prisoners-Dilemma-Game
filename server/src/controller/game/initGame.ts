import { Game } from '../../services/index.js'
import { SINGLE_PLAYER } from './constants.js'
import { BOT_TIT, BOT_COOPERATOR, BOT_DEFECATOR } from '../../constants/bots.js'

export function createGame(type: string) {
    const game = new Game()

    if(type == SINGLE_PLAYER) {
        game.addPrisoner([BOT_TIT]: "bot")
        game.addPrisoner([BOT_COOPERATOR]: "bot")
        game.addPrisoner([BOT_DEFECATOR]: "bot")
    }
    
    return game
}