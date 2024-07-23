import express, { Request, Response } from "express";
import connectToDatabase from "./db";

const app = express();

const PORT = 1357;

connectToDatabase

app.get("/ping", (request: Request, response: Response) => {
    response.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
