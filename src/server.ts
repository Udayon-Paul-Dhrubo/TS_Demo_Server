import express from 'express'
import dbInit from './database/init'
import { Request, Response } from "express";
import { notFoundHandler, defaultErrorHandler } from "./error-handler/error-handler";


// db connection
dbInit();

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

//404 handler
app.use(notFoundHandler);

//default error handler
app.use(defaultErrorHandler);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
