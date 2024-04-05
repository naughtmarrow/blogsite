import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const cpool = async () => {
    try {
        const connectionPool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DBNAME,
        });
        return connectionPool;
    } catch (err) {
        console.error("Error creating connection pool:", err.message);
        throw new Error("Failed to connect to MySQL database");
    }
};

const pool = await cpool()

export default pool;
