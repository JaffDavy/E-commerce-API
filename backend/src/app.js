import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import productRoutes from "./routes/productRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const swaggerDocument = YAML.load(
  join(__dirname, "./swaggerYaml/swagger.yaml"),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.send("Ecommerce API is running"));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, _next) => {
  if (logger && typeof logger.error === "function") {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl}`);
  } else {
    console.error("Winston logger missing:", err);
  }

  res.status(err.status || 500).json({
    status: "error",
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

export default app;
