import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator("#email");
    this.passwordInput = page.getByPlaceholder("Enter Password");
    this.submitButton = page.locator("button[type='submit']");
  }

  async goto() {
    await this.page.goto("http://localhost:5173/teacher/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle("Teacher Login - Student Tracker");
  }
  async verifyInvalidLoginMessage() {
    await expect(this.page.getByText("Invalid credentials")).toBeVisible();
  }
}
