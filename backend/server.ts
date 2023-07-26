import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { notFoundError, errorHandler } from "./src/middleware/errorHandler";
import userRouter from "./src/routes/userRoutes";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server.ts listening on port ${port}.`);
});
