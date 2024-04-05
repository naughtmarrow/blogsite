import pool from "../controllers/DBController.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const user_model = (data) => {
    return {
        username: data.username,
        password: data.password,
    };
};

user_model.create = async (data) => {
    try {
        const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
        const [result] = await pool.promise().query(
            `
            INSERT INTO users(username, password)   
            VALUES(?, ?);
        `,
            [data.username, hash],
        );
        console.log("User created succesfully");
        const rid = result.insertId;
        return rid;
    } catch (err) {
        console.error("Failed to create new user:", err.message);
        throw new Error("Error on user API");
    }
};

user_model.read = async (id) => {
    return await pool
        .promise()
        .query(
            `
            SELECT * FROM users WHERE user_id = ?;
        `,
            [id],
        )
        .then(([result]) => {
            return result[0];
        })
        .catch((err) => {
            console.error("Failed to fetch user:", err.message);
            throw new Error("Error on user API");
        });
};

user_model.read_from_name = async (username) => {
    return await pool
        .promise()
        .query(
            `
            SELECT * FROM users WHERE username = ?;
        `,
            [username],
        )
        .then(([result]) => {
            console.log(result[0]);
            return result[0];
        })
        .catch((err) => {
            console.error("Failed to fetch user:", err.message);
            throw new Error("Error on user API");
        });
};

user_model.read_all = async () => {
    return await pool
        .promise()
        .query(
            `
            SELECT * FROM users;
        `,
        )
        .then(([result]) => {
            return result;
        })
        .catch((err) => {
            console.error("Failed to fetch user:", err.message);
            throw new Error("Error on user API");
        });
};

user_model.update = async (data) => {
    return await pool
        .promise()
        .query(
            `
            UPDATE users SET ? = ? WHERE user_id = ?;
        `,
            [data.to_update, data.new_value, data.user_id],
        )
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error("Failed to update user:", err.message);
            throw new Error("Error on user API");
        });
};

user_model.delete = async (id) => {
    return await pool
        .promise()
        .query(
            `
            DELETE FROM users WHERE user_id=?;
        `,
            [id],
        )
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error("Failed to delete user:", err.message);
            throw new Error("Error on user API");
        });
};

export default user_model;
