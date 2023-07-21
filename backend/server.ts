import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";
import { Pool } from "pg";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const pool = new Pool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT!) || 5432,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: true,
});

// pool.connect();

app.get(
	"/",
	asyncHandler(async (req: any, res: any) => {
		const employees = await pool.query("SELECT * FROM departments;");
		res.send(employees.rows);
	})
);

app.listen(port, () => {
	console.log(`Server.ts listening on port ${port}.`);
});
