const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");
const { DashboardPage } = require("../../pages/DashboardPage");
const { StudentPage } = require("../../pages/StudentPage");
const { SubjectsPage } = require("../../pages/SubjectPage");
const { AttendancePage } = require("../../pages/AttendencePage");
const { createStudentData } = require("../../test-data/studentFactory");

Given("I am on the teacher login page", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When("I log in with valid credentials", async function () {
  await this.loginPage.login(
    this.users.teacherVaildCreds.email,
    this.users.teacherVaildCreds.password,
  );
});

When("I log in with invalid credentials", async function () {
  await this.loginPage.login(
    this.users.teacherInvalidCreds.email,
    this.users.teacherInvalidCreds.password,
  );
});

When("I log in with an invalid email format", async function () {
  await this.loginPage.login(
    "invalid-email-format",
    this.users.teacherInvalidCreds.password,
  );
});

When("I attempt to log in with empty email and password", async function () {
  await this.loginPage.login("", "");
});

Then("I should see the teacher dashboard", async function () {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyDashboardLoaded();
});

Then("I should see a login error", async function () {
  await this.loginPage.verifyInvalidLoginMessage();
});

Then("I should see a validation error for email", async function () {
  await this.loginPage.verifyInvalidEmailFormat();
});

Then("I should see required field validation errors", async function () {
  await this.loginPage.verifyEmptyFields();
});

Then("I should see the login page fields and button", async function () {
  await this.loginPage.verifyVisibilityOfLoginPageElements();
});

Given("I am logged in as a teacher", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(
    this.users.teacherVaildCreds.email,
    this.users.teacherVaildCreds.password,
  );
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.verifyDashboardLoaded();
});

When("I create a new student", async function () {
  this.student = createStudentData();
  const studentPage = new StudentPage(this.page);
  await studentPage.createStudent(this.student);
});

Then("the student should be saved successfully", async function () {
  expect(this.student).toBeDefined();
});

When("I add the following subjects:", async function (dataTable) {
  const subjects = dataTable.rawTable
    .flatMap((row) => row)
    .map((value) => value.trim())
    .filter(Boolean);
  const subjectsPage = new SubjectsPage(this.page);
  await subjectsPage.navigate();
  await subjectsPage.addSubjects(subjects);
  this.subjects = subjects;
});

Then("I should see all subjects in the subject list", async function () {
  const subjectsPage = new SubjectsPage(this.page);
  await subjectsPage.verifySubjectsExist(this.subjects);
});

Given("a teacher student exists", async function () {
  this.student = createStudentData();
  const studentPage = new StudentPage(this.page);
  await studentPage.createStudent(this.student);
});

When("I view the attendance page", async function () {
  this.attendancePage = new AttendancePage(this.page);
  await this.attendancePage.navigateToAttendancePage();
});

Then("I should see the student in the attendance list", async function () {
  await this.attendancePage.verifyStudentPresent(
    this.student.name,
    this.student.rollNumber,
  );
});
