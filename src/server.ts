import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import multer from "multer"
import {getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet,createPlanetImage}  from "./controller/planets.js"
import { logIn,signUp,logOut } from "./controller/users.js";
import { authorize } from "./authorize.js";
import "./passport.js"

const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"./uploads")
  },
  filename:(req,file,cb) =>{
    cb(null,file.originalname)
  },
})
const upload=multer({storage})
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
app.post('/api/planets/:id/image',upload.single("image"),createPlanetImage)
app.post('/api/users/login',logIn)
app.post('/api/users/signup', signUp)
app.post('/api/users/logout',authorize, logOut)


app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
});

