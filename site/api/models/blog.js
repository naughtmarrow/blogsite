import pool from "../controllers/DBController.js";

const blog_model = (data) => {
  return {
    title: data.title,
    description: data.description,
    md_link: data.md_link,
    upload_date: data.upload_date,
  };
};

blog_model.create = async (data) => {
  return pool
    .promise()
    .query(
      `
        INSERT INTO blogs(title, description, md_link, upload_date)   
        VALUES(?, ?, ?, ?);
    `,
      [data.title, data.description, data.md_link, data.upload_date],
    )
    .then(([result]) => {
      const rid = result.insertId;
      return rid;
    })
    .catch((err) => {
      console.error("Failed to create new blog:", err.message);
      throw new Error("Error on blog API");
    });
};

blog_model.read = async (id) => {
  return pool
    .promise()
    .query(
      `
            SELECT * FROM blogs WHERE blog_id = ?;
        `,
      [id],
    )
    .then(([result]) => {
      return result[0];
    })
    .catch((err) => {
      console.error("Failed to fetch blog:", err.message);
      throw new Error("Error on blog API");
    });
};

blog_model.update = async (data) => {
  return pool
    .promise()
    .query(
      `
            UPDATE blogs SET ? = ? WHERE blog_id = ?;
        `,
      [data.to_update, data.new_value, data.blog_id],
    )
    .then(([result]) => {
      return result.affectedRows;
    })
    .catch((err) => {
      console.error("Failed to update blog:", err.message);
      throw new Error("Error on blog API");
    });
};

blog_model.delete = async (id) => {
  return pool
    .promise()
    .query(
      `
        DELETE FROM blogs WHERE blog_id=?;
    `,
      [id],
    )
    .then(([result]) => {
      return result.affectedRows;
    })
    .catch((err) => {
      console.error("Failed to delete blog:", err.message);
      throw new Error("Error on blog API");
    });
};

blog_model.assign_tag = async (blog_id, tag_id) => {
  return pool
    .promise()
    .query(
      `
        INSERT INTO taglists(blog_id, tag_id)
        VALUES (?, ?);
    `,
      [blog_id, tag_id],
    )
    .then(([result]) => {
      console.log(
        `Tag with id ${tag_id} assigned succesfully to blog with id ${blog_id}`,
      );
      return result.insertId;
    })
    .catch((err) => {
      console.error("Failed to assign tag to blog:", err.message);
      throw new Error("Error on blog API");
    });
};

export default blog_model;
