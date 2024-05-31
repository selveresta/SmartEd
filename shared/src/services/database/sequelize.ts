// src/database.ts
import { Sequelize } from "sequelize-typescript";
import { User } from "../../models/user.model";

export class Database {
	public sequelize: Sequelize;

	constructor(config) {
		this.sequelize = new Sequelize({
			database: config.DB,
			username: config.USER,
			password: config.PASSWORD,
			host: config.HOST,
			dialect: config.DIALECT,
			port: 5433,
			pool: {
				max: config.pool.max,
				min: config.pool.min,
				acquire: config.pool.acquire,
				idle: config.pool.idle,
			},
			models: [User],
		});
	}
}
