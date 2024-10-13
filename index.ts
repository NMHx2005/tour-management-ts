import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { routesClient } from "./routes/client/index.route";
import bodyParser from "body-parser";

dotenv.config();
sequelize;


const app: Express = express();
const port: number | string = process.env.PORT || 3000;


app.set("views", "./views");
app.set("view engine", "pug");

// parse application/json
app.use(bodyParser.json());

routesClient(app);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});