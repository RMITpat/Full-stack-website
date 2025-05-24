import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/applicant.routes";
import courseRoutes from "./routes/course.routes";
import lecturerRoutes from "./routes/lecturer.routes";
import applicationRoutes from "./routes/application.routes";
import cors from "cors";
import { populate } from "./controller/populateDatabase";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes, lecturerRoutes, applicationRoutes, courseRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    console.log("populating database...");
    await populate();
    console.log("population done!!!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
