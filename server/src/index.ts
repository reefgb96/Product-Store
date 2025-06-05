import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import { seedMockProducts } from "./mockData";
import { productRoutes } from "./routes/productRoutes";
import { handleServiceError } from "./services/errorService";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "https://reefgb96.github.io/Product-Store" }));
app.use(express.json());

app.use("/api", productRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  handleServiceError(err, res, next);
});

sequelize
  .sync({ alter: true })
  .then(() => {
    return seedMockProducts();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to start server:", error);
  });
