const { test } = require("../fixtures/authfixtures");
const { SubjectsPage } = require("../pages/SubjectPage");

test.describe("Subject Tests", () => {
  let subjectsPage;

  test.beforeEach(async ({ page }) => {
    subjectsPage = new SubjectsPage(page);
    await subjectsPage.navigate();
  });

  test("subject creation and verfication", async () => {
    const subjects = [
      "English",
      "Geography",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer",
      "Economics",
    ];

    await subjectsPage.addSubjects(subjects);

    await subjectsPage.verifySubjectsExist(subjects);
  });
});
