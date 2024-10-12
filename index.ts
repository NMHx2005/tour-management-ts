import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { routesClient } from "./routes/client/index.route";

dotenv.config();
sequelize;


const app: Express = express();
const port: number | string = process.env.PORT || 3000;


app.set("views", "./views");
app.set("view engine", "pug");

routesClient(app);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});