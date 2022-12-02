import { writeFile } from "fs";
import Joi from "joi";
import pokemon from "../data/pokemon.json" assert { type: "json" };

const schema = Joi.object({
    Name: Joi.string().required(),
    "Type 1": Joi.string().required(),
    "Type 2": Joi.string().required(),
    Total: Joi.number().required(),
    HP: Joi.number().required(),
    Attack: Joi.number().required(),
    Defense: Joi.number().required(),
    Sp: Joi.object({
        " Atk": Joi.number().required(),
        " Def": Joi.number().required(),
    }).required(),
    Speed: Joi.number().required(),
    Generation: Joi.number().required(),
    Legendary: Joi.boolean().required(),
});

// fetch all pokemon from the database
export const fetchAllPokemon = async (event) => {
    try {
        const { limit = 10, offset = 0 } = event.payload;
        const payload = pokemon.slice(
            Number(offset),
            Number(offset) + Number(limit),
        );

        return {
            statusCode: 200,
            data: payload,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not fetch the pokemon." };
    }
};

// update a pokemon from the json file
export const updatePokemon = async (event) => {
    try {
        console.log(event);
        const { id } = event.payload.params;
        const pokemonToUpdate = pokemon.find((p) => p["#"] === id);
        if (!pokemonToUpdate) {
            return { statusCode: 404, error: "Pokemon not found." };
        }

        const { error, value } = schema.validate(event.payload.body);
        if (error) {
            return { statusCode: 400, error: error };
        }

        const updatedPokemon = { ...pokemonToUpdate, ...value };

        const index = pokemon.findIndex((p) => p["#"] === id);
        pokemon[index] = updatedPokemon;

        return {
            statusCode: 200,
            data: updatedPokemon,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not update the pokemon." };
    }
};

// delete a pokemon from the json file
export const deletePokemon = async (event) => {
    try {
        const { id } = event.payload;
        const pokemonToDelete = pokemon.find((p) => p["#"] === id);
        if (!pokemonToDelete) {
            return { statusCode: 404, error: "Pokemon not found." };
        }

        const index = pokemon.findIndex((p) => p["#"] === id);
        pokemon.splice(index, 1);

        writeFile("./data/pokemon.json", JSON.stringify(pokemon), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not delete the pokemon.",
                };
            }
        });

        return {
            statusCode: 200,
            data: "Pokemon deleted successfully.",
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not delete the pokemon." };
    }
};

// create a pokemon in the json file
export const createPokemon = async (event) => {
    try {
        const { error, value } = schema.validate(event.payload);
        if (error) {
            return { statusCode: 400, error: error };
        }

        const newPokemon = { "#": pokemon.length + 1, ...value };

        pokemon.push(newPokemon);

        writeFile("./data/pokemon.json", JSON.stringify(pokemon), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not create the pokemon.",
                };
            }
        });

        return {
            statusCode: 200,
            data: newPokemon,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not create the pokemon." };
    }
};
