import "reflect-metadata"
import { DataSource } from "typeorm"
import { Player } from "./services/entity/Player"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "prisoners.db",
  entities: [Player],
  synchronize: true,
  logging: false,
})
