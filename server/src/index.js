import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import urlRoute from "./routes/checkUrl.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//const __dirname = path.resolve();

app.use(
  cors({
    secure: false,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!13");
});

app.use("/api/analyze", urlRoute);




app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});