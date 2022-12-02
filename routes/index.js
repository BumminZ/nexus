import { Router } from "express";
import { checkAuth, checkIfAdmin, checkIfUser } from "../libs/auth.js";
import userRouter from "./user.js";
import pokemonRouter, { permissionPokemonRouter } from "./pokemon.js";
import permissionRouter from "./permission.js";

const router = Router();

router.use("/pokemon", checkIfUser, pokemonRouter);
router.use("/user", checkAuth, userRouter);
router.use("/permission", checkIfAdmin, permissionRouter);
router.use("/auth/pokemon", checkIfAdmin, permissionPokemonRouter);

export default router;
