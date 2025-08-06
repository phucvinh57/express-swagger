import { Router } from "express";
import { userRoutes } from "./user.route";

const rootRouter: Router = Router();

// Mount user routes
rootRouter.use("/users", userRoutes);

export default rootRouter;
