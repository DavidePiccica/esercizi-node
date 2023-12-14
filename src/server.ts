import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import {getAll, getById, create, updateById, deleteById}  from "./controller/planets.js"

dotenv.config()
const app = express()
app.use(express.json());
app.use(morgan("dev"));
const port = parseInt(process.env.PORT ?? "3000") || 3000;

app.get('api/planets', getAll);

app.get('api/planets/:id', getById);

app.post('api/planets', create)

app.put('api/planets/:id', updateById) 

app.delete('api/planets/:id', deleteById)

app.listen(port, () => {
  console.log(`Server up and running in port ${port}`);
});

