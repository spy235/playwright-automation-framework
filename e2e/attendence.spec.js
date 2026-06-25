import { expect, test } from "../fixtures/authfixtures";
import { StudentPage } from "../pages/StudentPage";
import { createStudentData } from "../test-data/studentFactory";

test.describe("Attandance page Test", () => {
  test("Attadance feature Testing", async ({ page }) => {
    const studentPage = new StudentPage(page);
    const studentData = await createStudentData();

    await studentPage.createStudent(studentData);
    console.log(studentData);

    await page.locator("a[href='/teacher/attendance']").click();
    await expect(page.getByText("Manage Attendance")).toBeVisible();

    let studentFound = false;

    await expect(page.locator("tbody")).toBeVisible();
    const countOfStudents = await page.locator("tbody tr").count();
    for (let i = 1; i <= countOfStudents; i++) {
      const studentNameRoll = await page
        .locator(`tbody tr:nth-child(${i}) td:nth-child(1) div p`)
        .allInnerTexts();
      console.log(studentNameRoll);

      console.log(typeof studentNameRoll[0]);
console.log(typeof studentData.rollNumber);

      if (
        studentNameRoll[0]?.trim() == studentData.name &&
        studentNameRoll[1]?.trim() == studentData.rollNumber
      ) {
        console.log("Inside the IF");
        studentFound = true;
        break;
      }
    }
    expect(studentFound).toBeTruthy();
  });
});
