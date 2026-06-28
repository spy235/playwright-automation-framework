const { test, expect } = require("@playwright/test");

const { users } = require("../../../test-data/user");
const { teacherLogin } = require("../routes/auth.api");
const {
  createSubject,
  getSubjects,
  deleteSubject,
} = require("../routes/subject.api");

let token;
let subjectsResponse;

const subjects = [
  { name: "Mathematics", code: "SUB001" },
  { name: "Physics", code: "SUB002" },
  { name: "Chemistry", code: "SUB003" },
  { name: "Biology", code: "SUB004" },
  { name: "Computer Science", code: "SUB005" },
  { name: "English", code: "SUB006" },
];

test.describe.serial("Subjects API", () => {
  test.beforeAll(async ({ request }) => {
    const response = await teacherLogin(
      request,
      users.teacherVaildCreds.email,
      users.teacherVaildCreds.password,
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    token = body.token;
  });

  test("Create Subjects", async ({ request }) => {
    for (const subject of subjects) {
      const response = await createSubject(request, token, subject);

      expect(response.ok()).toBeTruthy();
    }
  });

  test("Get Subjects", async ({ request }) => {
    const response = await getSubjects(request, token);

    expect(response.ok()).toBeTruthy();
    subjectsResponse = await response.json();
  });

  test("Delete Subjects", async ({ request }) => {
    for (const subject of subjectsResponse) {
      const response = await deleteSubject(request, token, subject.id);

      expect(response.ok()).toBeTruthy();
    }
  });
});
