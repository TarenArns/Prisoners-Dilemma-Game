import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Player {

  @PrimaryColumn({ type: "varchar", unique: true })
  username: string

  @Column()
  currentScore: number

  @Column()
  totalScore: number

  @Column()
  totalWins: number

  @Column()
  colludeCount: number

  @Column()
  defectCount: number

  constructor(
    username: string,
  ) {
    this.username = username
    this.currentScore = 0
    this.totalScore = 0
    this.totalWins = 0
    this.colludeCount = 0
    this.defectCount = 0
  }
}
