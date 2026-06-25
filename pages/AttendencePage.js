const { expect } = require("@playwright/test");

class AttendancePage {
  constructor(page) {
    this.page = page;

    this.attendanceMenu = page.locator("a[href='/teacher/attendance']");
    this.manageAttendanceTitle = page.getByText("Manage Attendance");
    this.attendanceTable = page.locator("tbody");
    this.studentRows = page.locator("tbody tr");
  }

  async navigateToAttendancePage() {
    await this.attendanceMenu.click();
    await expect(this.manageAttendanceTitle).toBeVisible();
  }

  async verifyStudentPresent(name, rollNumber) {
    await expect(this.attendanceTable).toBeVisible();

    const rowCount = await this.studentRows.count();

    for (let i = 1; i <= rowCount; i++) {
      const studentDetails = await this.page
        .locator(`tbody tr:nth-child(${i}) td:nth-child(1) div p`)
        .allInnerTexts();

      if (
        studentDetails[0]?.trim() === name &&
        studentDetails[1]?.trim() === rollNumber
      ) {
        return true;
      }
    }

    throw new Error(
      `Student not found. Name: ${name}, Roll Number: ${rollNumber}`,
    );
  }
}

module.exports = { AttendancePage };
