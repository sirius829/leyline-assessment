import { Router } from "express";
import { getAmount, getResponse, submitSettlement, respondSettlement } from "../../controllers/settlement.controller";
import { authorizeMiddleware } from "../../Middlewares/authModdleware";
import { ROLE } from "../../constants";

const transRouter = Router();

transRouter.get("/amount", getAmount);
transRouter.get("/response", getResponse);
transRouter.post("/submit", authorizeMiddleware(ROLE.PARTY_A), submitSettlement);
transRouter.post("/respond", authorizeMiddleware(ROLE.PARTY_B), respondSettlement);

export default transRouter;