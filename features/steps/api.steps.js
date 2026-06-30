const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { teacherLogin } = require("../../e2e/API/routes/auth.api");
const {
  createSubject,
  getSubjects,
  deleteSubject,
} = require("../../e2e/API/routes/subject.api");

Given("I have a valid teacher API token", async function () {
  const response = await teacherLogin(
    this.requestContext,
    this.users.teacherVaildCreds.email,
    this.users.teacherVaildCreds.password,
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  this.apiToken = body.token;
});

When("I create the following subjects:", async function (dataTable) {
  this.createdSubjects = dataTable.rawTable
    .flatMap((row) => row)
    .map((name) => ({
      name: name.trim(),
      code: `SUB${Math.floor(Math.random() * 900 + 100)}`,
    }));

  for (const subject of this.createdSubjects) {
    const response = await createSubject(
      this.requestContext,
      this.apiToken,
      subject,
    );
    expect(response.ok()).toBeTruthy();
  }
});

Then("I can retrieve the subjects", async function () {
  const response = await getSubjects(this.requestContext, this.apiToken);
  expect(response.ok()).toBeTruthy();
  this.retrievedSubjects = await response.json();
  const retrievedNames = this.retrievedSubjects.map((subject) => subject.name);
  for (const subject of this.createdSubjects) {
    expect(retrievedNames).toContain(subject.name);
  }
});

Then("I can delete all created subjects", async function () {
  for (const subject of this.retrievedSubjects) {
    const response = await deleteSubject(
      this.requestContext,
      this.apiToken,
      subject.id,
    );
    expect(response.ok()).toBeTruthy();
  }
});
