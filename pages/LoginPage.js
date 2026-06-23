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
    await this.page.waitForURL("**/teacher/dashboard");
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle("Teacher Login - Student Tracker");
  }
  async verifyInvalidLoginMessage() {
    await expect(this.page.getByText("Invalid credentials")).toBeVisible();
  }
  async verifyInvalidemail() {
    const message = await this.emailInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(message).toContain("@");
  }

  async verifyEmptyFeilds() {
    const message = await this.emailInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(message).toContain("Please fill out this field.");
  }
  async verifyEmptyPasswordFeild() {
    const message = await this.passwordInput.evaluate(
      (el) => el.validationMessage,
    );
    expect(message).toContain("Please fill out this field.");
  }

  async verifyVisiblityofLoginPageElements() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
