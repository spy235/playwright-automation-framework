import { page, expect } from "@playwright/test";

export class ToastMessages {
  constructor(page) {
    this.page = page;
  }

  async verifyInvalidLoginMessage() {
    await expect(this.page.getByText("Invalid credentials.")).toBeVisible();
  }
}
