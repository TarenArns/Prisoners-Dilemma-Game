/* 
    STATES:
    1. Wait for players (one player connected -> 2)
        - allows players to connect, p1 can configure lobby

    2. Ready to start (lobby full -> 3; started -> 4; p1 leaves -> 1)
        - p1 can initialize tourney, players can connect/add bots

    3. Lobby full (players leave -> 2; started -> 4)
        - p1 can initialize tourney, players cannot connect

    4. Game running (all matches/rounds done -> 5)
        - n(n-1)/2 games, n/2 at a time, so n-1 rounds? (if it even matters)
        - number of rounds is log2(nplayers)

    5. Game complete (restart match -> 2; quit -> 1)
        - present outcomes
        - show leaderboard?
*/

const MATCH_ROUNDS = 10

// TODO: scores could be configurable?
const SCORING = { // SCORING[choice1][choice2] returns [score1, score2]
    // TODO: 2(cc) > (cd) + (dc) is a condition?
    false: { false: [1, 1], true: [3, 0] },
    true: { false: [0, 3], true: [2, 2] }
}

const Choice = { def: false, coop: true } as const
type Choice = (typeof Choice)[keyof typeof Choice]

type PrisType = (typeof PrisType)[keyof typeof PrisType]

const choose = (type: PrisType, history: Choice[]) => {
    switch (type) {
        case PrisType.random :
            return Math.random() < 0.5
        case PrisType.cooperator : 
            return Choice.coop
        case PrisType.defecator : 
            return Choice.def
        case PrisType.tit4tat :
            if (history[history.length-1] == Choice.def) {
                return Choice.def
            } else return Choice.coop
    }
}

class Prisoner {
    private _user: string;
    private _score: number = 0
    private _history: Choice[] = []
    private _type: PrisType

    public constructor(user: string, type: PrisType) {
        this._user = user
        this._type = type
    }

    public async makeChoice(oppHistory: Choice[]) {
        let c = await new Promise<Choice>((resolve) => {
            resolve(choose(this._type, oppHistory))
        })
        this._history.push(c)
        return c
    }

    public addScore(score: number): void {
        this._score += score
    }

    public get user(): string { return this._user }
    public get score(): number { return this._score }
    public get history(): Choice[] {return this._history}
}

class Match {
    private p1: Prisoner
    private p2: Prisoner
    private history: [Choice, Choice][]
    private length: number

    public constructor(p1: Prisoner, p2: Prisoner, length: number) {
        this.p1 = p1
        this.p2 = p2
        this.history = []
        this.length = length
    }

    public async run() {
        for (let i=0; i<this.length; i++) {

            // request choice from both players
            let choices = await Promise.all([
                this.p1.makeChoice(this.p2.history),
                this.p2.makeChoice(this.p1.history)
            ])

            // TODO how to handle history?
            this.history.push([choices[0], choices[1]])
            let scores = SCORING[`${choices[0]}`][`${choices[1]}`]
            this.p1.addScore(scores[0])
            this.p2.addScore(scores[1])
        }

        console.log(`${this.p1.user} vs ${this.p2.user}:`)
        console.log(this.history)
    }
}

export class Game {
    private _prisoners: Prisoner[] = []

    public async run() {
        // Pair up all players
        let matchThreads: Promise<void>[] = []
        for (let i in this._prisoners) {
            let p1 = this._prisoners[i];
            for (let j in this._prisoners.slice(+i+1)) {
                let p2 = this._prisoners[j];
                matchThreads.push(new Match(p1, p2, MATCH_ROUNDS).run())
            }
        }
        await Promise.all(matchThreads)

        for (let p of this._prisoners) {
            console.log(`${p.user}: ${p.score}`)
        }
    }

    public get prisoners() {return this._prisoners}
    public addPrisoner(user: string, type: PrisType) {
        this._prisoners.push(new Prisoner(user, type))
    }
    public removePrisoner(user: string) {
        delete this._prisoners[this._prisoners.findIndex((p) => p.user == user)]
    }
}

/***************************************************
 * vvv MAIN vvv
 **************************************************/

// Initialize game with players (simulated)

let g = new Game()

g.addPrisoner("Leon", "Random")
g.addPrisoner("Daniel", "Random")
g.addPrisoner("Taren", "Random")
g.addPrisoner("Taren", "Random")

await g.run()
