import { writeFile } from "fs";
import Joi from "joi";
import users from "../data/user.json" assert { type: "json" };

const user = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
});

// create a user in the json file
export const createUser = async (event) => {
    try {
        const { error, value } = user.validate(event.payload);
        if (error) {
            return { statusCode: 400, error: error };
        }
        const newUser = { id: `${users.length + 1}`, ...value, role: "user" };
        users.push(newUser);
        writeFile("./data/user.json", JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not create the user.",
                };
            }
        });
        return {
            statusCode: 200,
            data: newUser,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not create the user." };
    }
};

// delete a user from the json file
export const deleteUser = async (event) => {
    try {
        const { id } = event.payload;
        const userToDelete = users.find((u) => u.id === id);
        if (!userToDelete) {
            return {
                statusCode: 404,
                error: {
                    message: "User not found.",
                },
            };
        }
        const index = users.findIndex((u) => u.id === id);
        users.splice(index, 1);
        writeFile("./data/user.json", JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not delete the user.",
                };
            }
        });
        return {
            statusCode: 200,
            data: "User deleted successfully.",
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not delete the user." };
    }
};

// update a user in the json file
export const updateUser = async (event) => {
    try {
        const { id } = event.payload.params;

        const { error, value } = user.validate(event.payload.body);
        if (error) {
            return { statusCode: 400, error: error };
        }

        const userToUpdate = users.find((u) => u.id === id);
        if (!userToUpdate) {
            return { statusCode: 404, error: "User not found." };
        }
        const index = users.findIndex((u) => u.id === id);
        users[index] = { ...users[index], ...value };
        writeFile("./data/user.json", JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not update the user.",
                };
            }
        });
        return {
            statusCode: 200,
            data: "User updated successfully.",
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not update the user." };
    }
};

// get a user from the json file
export const getUser = async (event) => {
    try {
        const { id } = event.payload;
        const user = users.find((u) => u.id === id);
        if (!user) {
            return {
                statusCode: 404,
                error: {
                    message: "User not found.",
                },
            };
        }
        return {
            statusCode: 200,
            data: user,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not get the user." };
    }
};

// get all users from the json file
export const getAllUsers = async (event) => {
    try {
        return {
            statusCode: 200,
            data: users,
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not get the users." };
    }
};

// update role of a user in the json file
export const updateUserRole = async (event) => {
    try {
        const { id } = event.payload.params;
        const { role } = event.payload.body;
        const userToUpdate = users.find((u) => u.id === id);
        if (!userToUpdate) {
            return {
                statusCode: 404,
                error: {
                    message: "User not found.",
                },
            };
        }
        const index = users.findIndex((u) => u.id === id);
        users[index] = { ...users[index], role: role };
        writeFile("./data/user.json", JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return {
                    statusCode: 500,
                    error: "Could not update the user role.",
                };
            }
        });
        return {
            statusCode: 200,
            data: "User role updated successfully.",
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, error: "Could not update the user role." };
    }
};
