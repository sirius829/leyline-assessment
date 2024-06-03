import { Router } from "express";
import v1Router from "./v1";

const defaultRouter = Router();

defaultRouter.use("/v1", v1Router);

export default defaultRouter;
