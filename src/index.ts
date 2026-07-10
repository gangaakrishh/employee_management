import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import errorMiddleware from "./utils/error.response";
import notFoundMiddleware from "./middlewares/not-found.middleware";
import { swaggerOptions } from "./configs/swagger.config";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

routes.forEach((route) => {
  app.use(`/api${route?.route}`, route?.router);
});

const spec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(notFoundMiddleware);
app.use(errorMiddleware);
