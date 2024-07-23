import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = 1357;

connectToDatabase();

app.get("/ping", (request: Request, response: Response) => {
    response.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
