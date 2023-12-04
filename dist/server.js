var _a;
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000") || 3000;
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
const app = express();
app.get('/', (req, res) => {
    res.json(planets);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`Example app listening  on port http://localhost:${port}`);
});
