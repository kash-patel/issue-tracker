import dotenv from "dotenv";
dotenv.config();
import { Pool, QueryResult } from "pg";

const pool = new Pool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT!) || 5432,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	ssl: true,
});

pool.on("error", (err, client) => {
	console.error("Unexpected client error.", err);
	process.exit(-1);
});

const query = (text: string, values?: any) => pool.query(text, values);

export const db = { query };
