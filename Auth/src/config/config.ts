import dotenv from "dotenv";

dotenv.config();

export const config = {
	DB: process.env.DB_NAME || "your_db_name",
	USER: process.env.DB_USER || "your_db_user",
	PASSWORD: process.env.DB_PASS || "your_db_pass",
	HOST: process.env.DB_HOST || "localhost",
	DIALECT: process.env.DB_DIALECT || "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
