import express from "express";
import morgan from "morgan";
import Routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1", Routes);

app.use((req, res) => {
  res.send({
    msg: "Page Not Found",
    success: false,
    code: 404,
  });
  return;
});

export default app;
