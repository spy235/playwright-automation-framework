import { test } from "../../fixtures/authfixtures";
import { expect } from "@playwright/test";
import { StudentPage } from "../../pages/StudentPage";
import { createStudentData } from "../../test-data/studentFactory";
import { users } from "../../test-data/user";

test.describe("Student page Tests", () => {
  test("Student creation", async ({ page, request }) => {
    const studentData = createStudentData();

    // Login via API to obtain token
    const loginResp = await request.post(
      "http://localhost:5000/api/auth/teacher/login",
      {
        data: {
          email: users.teacherVaildCreds.email,
          password: users.teacherVaildCreds.password,
        },
      }
    );
    expect(loginResp.ok()).toBeTruthy();
    const loginBody = await loginResp.json();
    const token = loginBody.token;

    // Fetch existing subjects
    const subjectsResp = await request.get("http://localhost:5000/api/subjects", {
      headers: { authorization: `Bearer ${token}` },
    });
    expect(subjectsResp.ok()).toBeTruthy();
    const subjects = await subjectsResp.json();
    const subjectNames = subjects.map((s) => s.name?.trim());

    // Create subject if missing
    if (!subjectNames.includes(studentData.subject)) {
      const createResp = await request.post("http://localhost:5000/api/subjects", {
        headers: { authorization: `Bearer ${token}` },
        data: { name: studentData.subject, code: `SUB${Date.now()}` },
      });
      expect(createResp.ok()).toBeTruthy();
    }

    // Proceed to UI to add student
    const studentPage = new StudentPage(page);
    await studentPage.createStudent(studentData);
  });
});
