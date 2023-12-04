import express from "express"
import dotenv from "dotenv"

import { Request, Response,NextFunction } from 'express';

dotenv.config()
const port = parseInt(process.env.PORT?? "3000")||3000;
let planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

const app = express()


app.get('/', (req:any, res) => {
    res.json(planets);
})
app.use((err:Error, req:Request, res:Response,next:NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.listen(port, () => {
  console.log(`Example app listening  on port http://localhost:${port}`)
})