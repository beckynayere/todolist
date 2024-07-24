import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes";

const app = express();
dotenv.config();

const PORT = 1357;
app.use(express.json())

connectToDatabase();

app.get("/ping", (request: Request, response: Response) => {
    response.send('Pong');
});
app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
