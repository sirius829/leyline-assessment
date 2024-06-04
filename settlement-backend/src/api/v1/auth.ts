import { Router } from "express";
import { Login } from "../../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/register", Login);

export default authRouter;