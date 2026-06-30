const { faker } = require("@faker-js/faker");

function createStudentData() {
  return {
    name: faker.person.fullName(),
    rollNumber: faker.number.int({ min: 1000, max: 9999 }).toString(),
    password: "Yashas@235@",
    subject: "Geography",
    marks: faker.number.int({ min: 35, max: 100 }).toString(),
  };
}

module.exports = { createStudentData };
