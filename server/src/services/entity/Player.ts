import { Entity, Column } from "typeorm";

@Entity()
export class Player {

  @Column({ type: "varchar", unique: true })
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

}
