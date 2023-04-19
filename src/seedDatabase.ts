import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

import User from './models/userModels';
import Issue from './models/issueModels';
import Label from './models/labelModels';

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const clearDatabase = async () => {
  await User.deleteMany({});
  await Issue.deleteMany({});
};

const generateFakeData = async () => {
  // Créer 200 utilisateurs
  const users = await Promise.all(
    Array.from({ length: 200 }, async () => {
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profilePictureUrl: faker.internet.avatar(),
      });
      return user.save();
    })
  );

  // Créer entre 0 et 5 issues pour chaque utilisateur
  const issueStatuses = (Issue.schema.path('status') as mongoose.Schema.Types.String & { enumValues: string[] }).enumValues;

  await Promise.all(
    users.map(async (user) => {
      const issueCount = Math.floor(Math.random() * 6);
      return Promise.all(
        Array.from({ length: issueCount }, async () => {
          const issue = new Issue({
            title: faker.lorem.words(3),
            status: randomElement(issueStatuses),
            createdBy: user,
            assignee: randomElement(users),
            labels: [randomElement(await Label.find())],
            comments: [],
          });
          // Créer entre 0 et 10 commentaires pour chaque issue
          const commentCount = Math.floor(Math.random() * 11);
          const comments = Array.from({ length: commentCount }, () => ({
            comment: faker.lorem.sentences(3),
            createdBy: randomElement(users)._id.toString(),
            createdDate: faker.date.recent(),
          }));
          issue.comments.push(...comments);
          issue.commentCount = commentCount;
          return issue.save();
        })
      );
    })
  );
};

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log('🌱 Connected to MongoDB');

    await clearDatabase();
    console.log('🌱 Database cleared');

    await generateFakeData();

    console.log('🌱 Fake data generation completed');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
})();
