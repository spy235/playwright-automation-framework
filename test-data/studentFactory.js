import { faker } from "@faker-js/faker";

export const createStudentData = () => ({
  name: faker.person.fullName(),
  rollNumber: faker.number.int({ min: 1000, max: 9999 }).toString(),
  password: "Yashas@235@",
  subject: "Geography",
  marks: faker.number.int({ min: 35, max: 100 }).toString(),
});
