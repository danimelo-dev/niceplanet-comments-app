import express from "express";
import cors from "cors";
import { commentsRoutes } from "../presentation/routes/comments.routes";
import { requestLogger } from "../middlewares/request-logger.middleware";


const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.use(commentsRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});