import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";

import {getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet}  from "./controller/planets.js"

dotenv.config()
const app = express()
app.use(express.json());
app.use(morgan("dev"));
const port = parseInt(process.env.PORT ?? "3000") || 3000;

app.get('/api/planets',getAllPlanets );
app.get('/api/planets/:id',getPlanet );
app.post('/api/planets', createPlanet)
app.put('/api/planets/:id', updatePlanet) 
app.delete('/api/planets/:id', deletePlanet)

app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
});

