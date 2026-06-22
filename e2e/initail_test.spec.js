import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { users } from "../test-data/user";
import { ToastMessages } from "../pages/ToastMessages";

test.describe("Login Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.verifyPageLoaded();
  });

  test("Teacher Login Valid Cred", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(
      users.teacherVaildCreds.email,
      users.teacherVaildCreds.password,
    );

    await dashboardPage.verifyDashboardLoaded();
  });

  test("Teacher Login Invalid Cred", async () => {
    await loginPage.login(
      users.teacherInvalidCreds.email,
      users.teacherInvalidCreds.password,
    );
  });
});
