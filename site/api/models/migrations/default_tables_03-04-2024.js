import pool from "../../controllers/DBController.js"

async function createUsersTable() {
    try {
        pool.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT NOT NULL AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (user_id)
            );
            `,
        );
        console.log("Users table created succesfully");
    } catch (err) {
        console.error("Error creating user table:", err.message);
        throw new Error("Failed to run MySQL database migration");
    }
}

async function createBlogsTable() {
    try {
        pool.query(
            `
            CREATE TABLE IF NOT EXISTS blogs (
                blog_id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                md_link VARCHAR(255) NOT NULL,
                upload_date DATE NOT NULL,
                PRIMARY KEY (blog_id)
            );
            `,
        );
        console.log("Blogs table created succesfully");
    } catch (err) {
        console.error("Error creating blogs table:", err.message);
        throw new Error("Failed to run MySQL database migration");
    }
}

async function createTagsTable() {
    try {
        pool.query(
            `
            CREATE TABLE IF NOT EXISTS tags (
                tag_id INT NOT NULL AUTO_INCREMENT,
                tagname VARCHAR(255) NOT NULL,
                background VARCHAR(255) NOT NULL,
                color VARCHAR(255) NOT NULL,
                PRIMARY KEY (tag_id)
            );
            `,
        );
        console.log("Tags table created succesfully");
    } catch (err) {
        console.error("Error creating tags table:", err.message);
        throw new Error("Failed to run MySQL database migration");
    }
}

async function createTagListTable() {
    try {
        pool.query(
            `
            CREATE TABLE IF NOT EXISTS taglists (
                list_id INT NOT NULL AUTO_INCREMENT,
                blog_id INT NOT NULL,
                tag_id INT NOT NULL,
                PRIMARY KEY (list_id),
                FOREIGN KEY (blog_id) REFERENCES blogs(blog_id),
                FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
            );
            `,
        );
        console.log("Tag lists table created succesfully");
    } catch (err) {
        console.error("Error creating tag lists table:", err.message);
        throw new Error("Failed to run MySQL database migration");
    }
}

async function migration() {
    try {
        await createUsersTable();
        await createBlogsTable();
        await createTagsTable();
        await createTagListTable();
        console.log("Migration completed succesfully")
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
}
migration();
