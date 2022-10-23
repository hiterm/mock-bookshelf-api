import { faker } from "@faker-js/faker";
import { genIsbn13 } from "./isbn";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const mocks = {
  Book: () => ({
    id: () => faker.datatype.uuid(),
    title: () => faker.lorem.words(),
    authorIds: () => Array.from({ length: getRandomInt(1, 3) }),
    isbn: () => genIsbn13(),
    read: faker.datatype.boolean(),
    owned: faker.datatype.boolean(),
    priority: getRandomInt(0, 100),
    createdAt: Math.floor(faker.date.past().getTime() / 1000),
    updatedAt: Math.floor(faker.date.past().getTime() / 1000),
    authors: () => Array.from({ length: getRandomInt(1, 3) }),
  }),
  Author: () => ({
    id: () => faker.datatype.uuid(),
    name: () => faker.name.fullName(),
  }),
};
