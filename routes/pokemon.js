import { Router } from "express";
import {
    createPokemon,
    deletePokemon,
    fetchAllPokemon,
    updatePokemon,
} from "../handlers/pokemon.js";
import { routerEnclose } from "../libs/fn.js";

const pokemonRouter = Router();
export const permissionPokemonRouter = Router();

pokemonRouter.get(
    "/",
    routerEnclose(fetchAllPokemon, ({ query }) => ({
        source: "express",
        payload: query,
    })),
);

permissionPokemonRouter.put(
    "/:id",
    routerEnclose(updatePokemon, ({ params, body }) => ({
        source: "express",
        payload: {
            params: params,
            body: body,
        },
    })),
);

permissionPokemonRouter.delete(
    "/:id",
    routerEnclose(deletePokemon, ({ params }) => ({
        source: "express",
        payload: params,
    })),
);

permissionPokemonRouter.post(
    "/",
    routerEnclose(createPokemon, ({ body }) => ({
        source: "express",
        payload: body,
    })),
);

export default pokemonRouter;
