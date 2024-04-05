import { faker } from "@faker-js/faker";
import blog_model from "../blog.js";

async function seedDB() {
    if (process.argv.length !== 3) {
        console.error(
            "Seeder only accepts quantity of seeds as argument (integer)",
        );
        process.exit(-1);
    }
    const quantity = process.argv[2];
    let promises = [];
    for (let i = 0; i < quantity; i++) {
        const promise = new Promise(async (resolve) => {
            const id = await blog_model.create({
                title: faker.word.words(5),
                description: faker.lorem.paragraph(20),
                md_link: faker.system.filePath(),
                upload_date: faker.date.recent(),
            });
            resolve(id);
        })
            .then(async (res) => {
                await blog_model.assign_tag(res, Math.floor(Math.random() * 10) + 1);
            })
            .catch((err) => {
                console.error("Blog with tags list seeder failed:", err.message);
                throw new Error("Blog promise has been rejected");
            });

        promises.push(promise);
    }

    Promise.all(promises)
        .then(() => {
            console.log("All seeds have finished succesfully");
            process.exit(0);
        })
        .catch((err) => {
            console.error("Blog with tags list seeder failed:", err.message);
        });
}
seedDB();
