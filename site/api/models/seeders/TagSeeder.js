import { faker } from "@faker-js/faker";
import tag_model from "../tag.js";

async function seedDB() {
  if (process.argv.length !== 3) {
    console.error(
      "Seeder only accepts quantity of seeds as argument (integer)",
    );
    process.exit(-1);
  }
  const quantity = process.argv[2];
  for (let i = 0; i < quantity; i++) {
    await tag_model.create({
      tagname: faker.word.noun(),
      background: faker.color.human(),
      color: faker.color.human(),
    });
  }
  process.exit(0);
}
seedDB();
