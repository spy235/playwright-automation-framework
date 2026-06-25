const { expect } = require("@playwright/test");

class SubjectsPage {
  constructor(page) {
    this.page = page;

    this.subjectNameInput = page.locator("#subject-name");
    this.addSubjectButton = page.locator("#add-subject-submit-btn");
    this.subjectRows = page.locator("table tbody tr");
    this.subjectLink = page.locator("a[href='/teacher/subjects']");
  }

  async navigate() {
    await this.page.goto("http://localhost:5173/teacher/dashboard");
    await this.subjectLink.click();
  }

  async addSubject(subjectName) {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.subjectNameInput.fill(subjectName);
    await this.addSubjectButton.click();
  }

  async addSubjects(subjects) {
    for (const subject of subjects) {
      await this.addSubject(subject);
    }
  }

  async getAllSubjects() {
    return await this.page
      .locator("table tbody tr td:first-child")
      .allTextContents();
  }

  async verifySubjectsExist(expectedSubjects) {
    const actualSubjects = await this.getAllSubjects();

    for (const subject of actualSubjects) {
      expect(expectedSubjects).toContain(subject.trim());
    }
  }
}

module.exports = { SubjectsPage };