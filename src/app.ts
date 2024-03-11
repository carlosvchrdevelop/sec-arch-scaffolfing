import express from "express";
import apiRouter from "./routes";
import wrapResponseMiddleware from "./middleware/wrapResponse.middleware";
import wrapErrorMiddleware from "./middleware/wrapError.middleware";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:4321",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(apiRouter);
app.use(wrapErrorMiddleware);
app.use(wrapResponseMiddleware);

app.listen(process.env.PORT || 3000);
