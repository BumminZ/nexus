import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";

dotenv.config({
    path: ".env",
});

// express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));

// routes
app.use("/api/v1", router);

// start express server
app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});
