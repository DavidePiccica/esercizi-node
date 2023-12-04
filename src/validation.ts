import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const planetSchema = Joi.object({
    id:Joi.number().required(),
    name: Joi.string().required(),
  });


const validatePlanet = (req: Request,res: Response,next: NextFunction): void => {
    const { error } = planetSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
  
  export { planetSchema, validatePlanet };