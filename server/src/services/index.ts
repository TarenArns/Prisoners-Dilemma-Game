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

// DEFAULT_SCORING[choice1][choice2] returns [score1, score2]
const DEFAULT_SCORING = { // TODO: 2(cc) > (cd) + (dc) should be a condition
    false: { false: [1, 1], true: [3, 0] },
    true: { false: [0, 3], true: [2, 2] }
}

const Choice = { def: false, coop: true } as const
type Choice = (typeof Choice)[keyof typeof Choice]

const PrisType = {
    player: "Player",
    random: "Random",
    cooperator: "Cooperator",
    defecator: "Defecator",
    tit4tat: "Tit4Tat",
} as const;
type PrisType = (typeof PrisType)[keyof typeof PrisType]

const choose = async (type: PrisType, oppHist: Choice[]) => {
    switch (type) {
        case "Random" :
            return Math.random() < 0.5

        case "Cooperator" : 
            return Choice.coop

        case "Defecator" : 
            return Choice.def

        case "Tit4Tat" :
            if (oppHist[oppHist.length-1] == Choice.def) {
                return Choice.def
            } else return Choice.coop

        case "Player" :
            return Choice.def // should never be called here
    }
}

class Prisoner {
    private _user: string;
    private _score: number = 0
    private _type: PrisType
    private _waiting: boolean = false // always false for bots, true when waiting
    private _last_choice: Choice = Choice.coop // ignored by bots

    // PLAYERS ONLY
    private async waitForChoice() { // needed separately bc uses class vars
        await new Promise(() => {while (this._waiting);})
        this._waiting = true
        return this._last_choice
    }

    public async changeLastChoice(c: Choice) {
        this._last_choice = c
        this._waiting = false
    }
    // *****

    public constructor(user: string, type: PrisType) {
        this._user = user
        this._type = type
    }

    public async makeChoice(oppHist: Choice[]) {
        let c: Choice
        if (this._type == "Player") {
            c = await this.waitForChoice()
        } else {
            c = await new Promise<Choice>((resolve) => {
                resolve(choose(this._type, oppHist))
            })
        }
        return c
    }

    public addScore(score: number): void {
        this._score += score
    }

    public get user(): string { return this._user }
    public get score(): number { return this._score }
}

class Match {
    private p1: Prisoner
    private p2: Prisoner
    private h1: Choice[]
    private h2: Choice[]
    private length: number
    private scoring = DEFAULT_SCORING

    public constructor(p1: Prisoner, p2: Prisoner, length: number, 
                       scoring: {false: {true: number[], false: number[]},
                                true: {true: number[], false: number[]}}) {
        this.p1 = p1
        this.p2 = p2
        this.h1 = []
        this.h2 = []
        this.length = length
        this.scoring = scoring
    }

    public async run() {
        for (let i=0; i<this.length; i++) {

            // request choice from both players
            let choices = await Promise.all([
                this.p1.makeChoice(this.h2),
                this.p2.makeChoice(this.h1) // TODO: concurrency in history 
            ])

            this.h1.push(choices[0])
            this.h2.push(choices[1])
            let scores = this.scoring[`${choices[0]}`][`${choices[1]}`]
            this.p1.addScore(scores[0])
            this.p2.addScore(scores[1])
        }

        console.log(`${this.p1.user} vs ${this.p2.user}:`)
        console.log(this.h1)
        console.log(this.h2)
    }
}

export class Game {
    private _prisoners: Prisoner[] = []
    private matchThreads: Promise<void>[] = []
    
    private matchMap: Record<string, Promise<void>> = {};

    // map each player to the match they're in -> how?

    public async getHistory(user: string) {

    }

    public async makeChoice(user: string, c: Choice) {
        let player = this._prisoners.find((p) => p.user == user)
        player?.changeLastChoice(c)
    }

    public async run() {

        // Start all matches
        for (let i in this._prisoners) {
            let p1 = this._prisoners[i];
            for (let j = +i + 1; j < this._prisoners.length; j++) {
                let p2 = this._prisoners[j];

                let m = new Match(p1, p2, MATCH_ROUNDS, DEFAULT_SCORING).run()
                this.matchThreads.push(m)
                this.matchMap[p1.user] = m
                this.matchMap[p2.user] = m
            }
        }
        
        // wait for all matches to complete
        await Promise.all(this.matchThreads)

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

let g = new Game()

g.addPrisoner("Leon", "Tit4Tat")
g.addPrisoner("Daniel", "Random")
g.addPrisoner("Taren", "Random")
g.addPrisoner("Miguel", "Random")

await g.run()
