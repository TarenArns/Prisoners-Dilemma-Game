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
    0: { 0: [1, 1], 1: [3, 0] },
    1: { 0: [0, 3], 1: [2, 2] }
}

const Choice = { def: 0, coop: 1 } as const
type Choice = (typeof Choice)[keyof typeof Choice]

abstract class Prisoner {
    private _user: string;
    private _score: number = 0
    private _history: Choice[] = []

    protected abstract choose(oppHistory: Choice[]): Choice

    public async makeChoice(oppHistory: Choice[]) {
        let c = await new Promise<Choice>((resolve) => {
            resolve(this.choose(oppHistory))
        })
        this._history.push(c)
        return c
    }

    public constructor(user: string) { this._user = user }

    public addScore(score: number): void {
        this._score += score
    }

    public get user(): string { return this._user }
    public get score(): number { return this._score }
    public get history(): Choice[] {return this._history}
}

class Random extends Prisoner {
    protected choose(): Choice { // TODO: implement choosing
        return Math.random() < 0.5 ? Choice.def : Choice.coop;
    }
}

/*
class Player extends Prisoner {
    protected choose(history: Choice[]): Choice {
        return Choice.def
    }
}

class Cooperator extends Prisoner {
    protected choose(history: Choice[]): Choice { return Choice.coop }
}

class Defecator extends Prisoner {
    protected choose(history: Choice[]): Choice { return Choice.def }
}

class Tit4Tat extends Prisoner {
    protected choose(history: Choice[]): Choice {
        if (history[history.length-1] == Choice.def) { return Choice.def }
        else { return Choice.coop }
    }
}
*/

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
            // TODO: should be async or something?

            let choices = await Promise.all([
                this.p1.makeChoice(this.p2.history),
                this.p2.makeChoice(this.p1.history)
            ])

            this.history.push([choices[0], choices[1]]) // TODO how to handle history?
            let scores = SCORING[`${choices[0]}`][`${choices[1]}`]
            this.p1.addScore(scores[0])
            this.p2.addScore(scores[1])
        }

        console.log(`${this.p1.user} vs ${this.p2.user}:`)
        console.log(this.history)
    }
}

class Game {
    private prisoners: Prisoner[]

    public constructor(prisoners: Prisoner[]) {
        this.prisoners = prisoners;
    }

    public async run() {
        // Pair up all players
        let matchThreads: Promise<void>[] = []
        for (let i in this.prisoners) {
            let p1 = this.prisoners[i];
            for (let j in this.prisoners.slice(+i+1)) {
                let p2 = this.prisoners[j];
                matchThreads.push(new Match(p1, p2, MATCH_ROUNDS).run())
            }
        }

        await Promise.all(matchThreads)

        for (let p of this.prisoners) {
            console.log(`${p.user}: ${p.score}`)
        }

    }
}

/***************************************************
 * vvv MAIN vvv
 **************************************************/

// Initialize game with players (simulated)
await new Game(
    [new Random("hi"), new Random("me")]
    // [new Defecator("Defecator1"), new Tit4Tat("Tit4Tat1"),
    // new Defecator("Defecator2"), new Cooperator("Cooperator1"),
    // new Random("Random1")]
).run()
