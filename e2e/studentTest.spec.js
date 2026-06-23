import { test } from "../fixtures/authfixtures";
import { StudentPage } from "../pages/StudentPage";
import { createStudentData } from "../test-data/studentFactory";

test.describe("Student page Tests", () => {
  test("Student creation", async ({ page }) => {
    const studentPage = new StudentPage(page);
 await studentPage.createStudent(createStudentData());
  });
});
