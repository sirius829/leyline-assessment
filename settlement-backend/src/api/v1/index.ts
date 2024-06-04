import { Router } from "express";
import transRouter from "./transaction";
import authRouter from "./auth";
import { authenticateMiddleware } from "../../Middlewares/authModdleware";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/settlement", authenticateMiddleware, transRouter);

export default v1Router;