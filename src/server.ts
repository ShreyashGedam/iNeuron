import express from "express";
import connection from "./config";
import Route from "./controllers/user.controller";
import swaggerDocs from "./swagger";

const app = express();

app.use(express.json());
app.use("/", Route);

connection();

export default app.listen(8080, () => {
  console.log("Server is listening on port 8080");

  swaggerDocs(app, 8080);
});
