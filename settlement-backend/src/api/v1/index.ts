import { Router } from "express";
import { getAmount, getResponse, submitSettlement, respondSettlement } from "../../controllers/settlement.controller";

const v1Router = Router();

v1Router.get("/amount", getAmount);
v1Router.get("/response", getResponse);
v1Router.post("/submit", submitSettlement);
v1Router.post("/respond", respondSettlement);

export default v1Router;