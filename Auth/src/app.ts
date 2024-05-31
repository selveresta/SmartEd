// src/app.ts
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Database } from "@smarted/shared";
import authRoutes from "./routes/authRoutes";
// import { config } from "./config/config";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

const config = {
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

const sequelize = new Database(config).sequelize; 

sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});
