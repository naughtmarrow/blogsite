import pool from "../controllers/DBController.js";

const tag_model = (data) => {
    return {
        tagname: data.tagname,
        background: data.background,
        color: data.color,
    };
};

tag_model.create = async (data) => {
    return pool
        .promise()
        .query(
            `
        INSERT INTO tags(tagname, background, color)   
        VALUES(?, ?, ?);
    `,
            [data.tagname, data.background, data.color],
        )
        .then(([result]) => {
            console.log("Tag created succesfully");
            const rid = result.insertId;
            return rid;
        })
        .catch((err) => {
            console.error("Failed to create new tag:", err.message);
            throw new Error("Error on tag API");
        });
};

tag_model.read = async (id) => {
    return pool
        .promise()
        .query(
            `
            SELECT * FROM tags WHERE tag_id = ?;
        `,
            [id],
        )
        .then(([result]) => {
            return result[0];
        })
        .catch((err) => {
            console.error("Failed to fetch tag:", err.message);
            throw new Error("Error on tag API");
        });
};

tag_model.update = async (data) => {
    return pool
        .promise()
        .query(
            `
            UPDATE tags SET ? = ? WHERE tag_id = ?;
        `,
            [data.to_update, data.new_value, data.tag_id],
        )
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error("Failed to update tag:", err.message);
            throw new Error("Error on tag API");
        });
};

tag_model.delete = async (id) => {
    return pool
        .promise()
        .query(
            `
        DELETE FROM tags WHERE tag_id=?;
    `,
            [id],
        )
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error("Failed to delete tag:", err.message);
            throw new Error("Error on tag API");
        });
};

export default tag_model;
