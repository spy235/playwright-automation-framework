import { page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  async verifyDashboardLoaded() {
    await expect(this.page.getByText("Welcome back!")).toBeVisible();

    await expect(this.page.locator("#dashboard-page h1")).toBeVisible();
  }
}
