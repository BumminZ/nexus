import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from "../handlers/user.js";
import { routerEnclose } from "../libs/fn.js";

// create auth router
const userRouter = Router();

// get user
userRouter.get(
    "/:id",
    routerEnclose(getUser, ({ params }) => ({
        source: "express",
        payload: params,
    })),
);

// create user
userRouter.post(
    "/",
    routerEnclose(createUser, ({ body }) => ({
        source: "express",
        payload: body,
    })),
);

// update user
userRouter.put(
    "/:id",
    routerEnclose(updateUser, ({ params, body }) => ({
        source: "express",
        payload: {
            params: params,
            body: body,
        },
    })),
);

// get all users
userRouter.get(
    "/",
    routerEnclose(getAllUsers, ({ query }) => ({
        source: "express",
        payload: query,
    })),
);

// delete user
userRouter.delete(
    "/:id",
    routerEnclose(deleteUser, ({ params }) => ({
        source: "express",
        payload: params,
    })),
);

export default userRouter;
