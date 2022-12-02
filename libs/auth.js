import dotenv from "dotenv";
import users from "../data/user.json" assert { type: "json" };

dotenv.config();

export const checkAuth = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken !== process.env.AUTH_TOKEN) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

export const checkIfAdmin = async (req, res, next) => {
    const authToken = req.headers.authorization;
    const user = users.find((user) => user.token === authToken);
    if (!user || user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};

export const checkIfUser = async (req, res, next) => {
    const authToken = req.headers.authorization;
    const user = users.find((user) => user.token === authToken);
    if (!user || user.role !== "user") {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
};
