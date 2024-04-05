import { faker } from "@faker-js/faker";
import user_model from "../user.js";

async function seedDB() {
  if (process.argv.length !== 3) {
    console.error(
      "Seeder only accepts quantity of seeds as argument (integer)",
    );
    process.exit(-1);
  }
  const quantity = process.argv[2];
  for (let i = 0; i < quantity; i++) {
    await user_model.create({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }
  process.exit(0);
}
seedDB();
