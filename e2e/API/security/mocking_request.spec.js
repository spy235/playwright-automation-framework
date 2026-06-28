import { test, expect } from "../../../fixtures/authfixtures";
import { StudentPage } from "../../../pages/StudentPage";
import { createStudentData } from "../../../test-data/studentFactory";

test("Should reject non-numeric marks", async ({ page }) => {
await page.route("**/api/students", async (route) => {
  const request = route.request();

  const originalBody = request.postData();

  console.log("===== ORIGINAL =====");
  console.log(originalBody);

  const modifiedBody = originalBody.replace(
    /"marks":"\d+"/,
    '"marks":"asfsdbstth"'
  );

  console.log("===== MODIFIED =====");
  console.log(modifiedBody);

  await route.continue({
    postData: modifiedBody,
    headers: request.headers(),
  });
});

  const studentObj = new StudentPage(page);
  await studentObj.createStudent(createStudentData());

  // Assert the backend rejected it
  await expect(page.getByText(/invalid marks/i)).toBeVisible();
});