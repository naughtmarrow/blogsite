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
  for (let i = 0; i < quantity; i++) {
    await blog_model.create({
      title: faker.word.words(5),
      description: faker.lorem.paragraph(20),
      md_link: faker.system.filePath(),
      upload_date: faker.date.recent(),
    });
  }
  process.exit(0);
}
seedDB();
