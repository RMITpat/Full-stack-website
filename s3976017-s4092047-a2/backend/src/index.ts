import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/applicant.routes";
import courseRoutes from "./routes/course.routes";
import lecturerRoutes from "./routes/lecturer.routes";
import applicationRoutes from "./routes/application.routes";
import voteRoutes from "./routes/vote.routes";
import cors from "cors";
import { populate } from "./controller/populateDatabase";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { askYesNoQuestion } from "../src/askToRepopulateDB";

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    //for the old rest api part
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const shouldPopulate = await askYesNoQuestion(
      "Do you want to repopulate the database?"
    );
    if (shouldPopulate) {
      console.log("Populating database...");
      await populate();
      console.log("Database population complete!");
    } else {
      console.log("Skipping population.");
    }

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api", userRoutes);
    app.use("/api", lecturerRoutes);
    app.use("/api", applicationRoutes);
    app.use("/api", courseRoutes);
    app.use("/api", voteRoutes);
    // for the graph ql part
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));

    app.listen(PORT, () => {
      console.log(`REST server running at http://localhost:${PORT}/api`);
      console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
}

startServer();
