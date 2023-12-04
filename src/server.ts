import express from "express"
import dotenv from "dotenv"
import { Request, Response, NextFunction } from 'express';
import {  validatePlanet } from './validation.js';

dotenv.config()
const app = express()
app.use(express.json());
const port = parseInt(process.env.PORT ?? "3000") || 3000;

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

app.get('/api/planets', (req: Request, res: Response) => {
  res.json(planets);
});

app.get('/api/planets/:id', (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.json(planet);
});

app.post('/api/planets', validatePlanet, (req: Request, res: Response) => {
    
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Invalid request. Missing name in the request body.' });
      }
  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets.push(newPlanet);

  res.status(201).json({ msg: 'Planet posted' });
});

app.put('/api/planets/:id', validatePlanet, (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex((p) => p.id === planetId);

  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets[planetIndex].name = req.body.name;

  res.json({ msg: 'Planet updated' });
});

app.delete('/api/planets/:id', (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id, 10);
    const planetIndex = planets.findIndex((p) => p.id === planetId);
  
    if (planetIndex === -1) {
      return res.status(404).json({ error: 'Planet not found' });
    }
  
    const deletedPlanet = planets.splice(planetIndex, 1)[0];
  
    res.status(204).json({ msg: `Planet deleted with ID ${deletedPlanet.id}` });
  });
  

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

app.listen(port, () => {
  console.log(`Planet app listening on port http://localhost:${port}`)
});
