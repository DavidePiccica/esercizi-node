import { Request, Response } from "express";
import  pgPromise from "pg-promise";
import Joi from "joi";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres")


const setupDb = async () => {
  db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)


  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
  await db.none(`INSERT INTO planets (name) VALUES ('Venus')`)

}
setupDb()


  
  const getAllPlanets = async  (_: Request, res: Response) => {
    const planets = await db.many(`SELECT * FROM planets;`)
    res.status(200).json(planets);
  }
  
  const getPlanet = async (req: Request, res: Response) => {
    const { id } = req.params
    const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id))
    res.status(200).json(planet);
  }

  const planetSchema = Joi.object({
    name: Joi.string().required(),
  })
  
  const createPlanet = async  (req: Request, res: Response) => {
    const { name}  = req.body;
    const newPlanet = { name }
    const validate = planetSchema.validate(newPlanet)
    if(validate.error){
      return res.status(400).json({ msg: "planet not updated"})
    } else {

      await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
        
      res.status(201).json({ msg: "the new planet was created" })
    }
  }

  const updatePlanet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    
    if(!id){
      return res.status(400).json({message:"error id is null or undefined"});
  }
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
    
    res.status(200).json({ msg: "Planet was updated"})
  }

  const deletePlanet = async (req: Request, res: Response) => {
    const {id} = req.params;

    if(!id){
      return res.status(400).json({message:"error id is null or undefined"});
  }
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))
    res.status(200).json({ msg:"Planet was deleted" })
  };

  export {getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet}