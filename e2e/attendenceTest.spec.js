const { expect, test } = require("../fixtures/authfixtures");
const { AttendancePage } = require("../pages/AttendencePage");
const { StudentPage } = require("../pages/StudentPage");
const { createStudentData } = require("../test-data/studentFactory");

test.describe("Attendance page Test", () => {
  test("Attendance feature Testing", async ({ page }) => {
    const studentPage = new StudentPage(page);
    const attendancePage = new AttendancePage(page);

    const studentData = await createStudentData();

    await studentPage.createStudent(studentData);

    await attendancePage.navigateToAttendancePage();

    await attendancePage.verifyStudentPresent(
      studentData.name,
      studentData.rollNumber,
    );
  });
});
