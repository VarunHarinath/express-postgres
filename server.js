import express from "express";
import Studentrouter from "./routes/routes.js";
import { home } from "./controllers/controller.js";

const app = express();
app.use(express.json());
const port = 4002;
app.get("/", home);
app.use("/api/Students", Studentrouter);
app.get("*", (req, res) => {
  res.json({
    message: "Error 404 Page Not Found",
  });
});
app.listen(port, () => {
  console.log(`server is runing on port:${port}`);
});
