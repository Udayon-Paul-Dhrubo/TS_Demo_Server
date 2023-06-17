import express from 'express'
import { Request, Response } from "express";
import { notFoundHandler, defaultErrorHandler } from "./error-handler/error-handler";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

//404 handler
app.use(notFoundHandler);

//default error handler
app.use(defaultErrorHandler);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
