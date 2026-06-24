import { expect, test } from "../fixtures/authfixtures";

test.describe("Subject Tests", () => {
  test("subject creation", async ({ page }) => {
    await page.goto("http://localhost:5173/teacher/dashboard");
    await page.locator("a[href='/teacher/subjects']").click();
    const subjects = [
      "English",
      "Geography",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer",
      "Economics",
    ];
    for (const subject of subjects) {
      await page.locator("#subject-name").fill(subject);
      await page.locator("#add-subject-submit-btn").click();

      await page.on("dialog", (dailog) => {
        dailog.accept();
      });

      //   await expect(
      //     page.locator("div[role='status']")
      //   ).toContainText("Subject added");
      //   await expect(
      //     page.locator("div[role='status']")
      //   ).toBeHidden()
    }

    //verify subject is added
    // const count = await page.locator("table tbody tr:nth-child(1) td:nth-child(1)")
    const count = await page.locator("table tbody tr").count();
    for (let i = 1; i <= count; i++) {
      const subject = await page
        .locator(`table tbody tr:nth-child(${i}) td:nth-child(1)`)
        .textContent();
      await expect(subjects.includes(subject)).toBeTruthy();
    }
  });
});
