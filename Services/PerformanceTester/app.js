import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
import pollingStation from "./routes/pollingStation.js";

app.use(express.static("./public"));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));

app.use("/pollingStation", pollingStation);

app.listen(3008);
