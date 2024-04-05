import express from "express";
import user_model from "../models/user.js";
import bcrypt from "bcrypt";
const userRouter = express.Router();

userRouter.get("/", async (_req, res) => {
    try {
        const user_list = await user_model.read_all();
        if (!user_list) {
            throw new Error("User list unavailable");
        }
        res.status(200).json(user_list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}); // probably won't need this but i might if i add multi-user support

userRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await user_model.read(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}); // same as the above

userRouter.get("/name/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const user = await user_model.read_from_name(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.post("/new", async (req, res) => {
    try {
        const { username, password } = req.body;
        const id = await user_model.create({
            username,
            password,
        });
        if (!id) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({
            message: "User has been created succesfully",
            user_id: id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user_json = await user_model.read_from_name(username);
        if (!user_json) {
            return res.status(401).json({ message: "User or password incorrect" });
        } // done this way to obfuscate whether the user wasn't found or the password didn't match
        // this is done for security purposes

        bcrypt.compare(password, user_json.password, (err, result) => {
            if (err) {
                console.error(err);
                throw new Error("Error processing password");
            }

            if (!result) {
                return res.status(401).json({ message: "User or password incorrect" });
            }
            
            const response = {
                message: "Login accepted",
                user: user_json
            }
            return res.status(200).json(response)
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default userRouter;
