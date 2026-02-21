"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Player_1 = require("./services/entity/Player");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "prisoners.db",
    entities: [Player_1.Player],
    synchronize: true,
    logging: false,
});
