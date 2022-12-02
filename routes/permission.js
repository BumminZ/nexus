import { Router } from "express";
import { updateUserRole } from "../handlers/user.js";
import { routerEnclose } from "../libs/fn.js";

const permissionRouter = Router();

permissionRouter.put(
    "/:id",
    routerEnclose(updateUserRole, ({ params, body }) => ({
        source: "express",
        payload: {
            params: params,
            body: body,
        },
    })),
);

export default permissionRouter;
