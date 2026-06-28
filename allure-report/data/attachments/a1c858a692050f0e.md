# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginTest.spec.js >> Login Tests >> Should not login with empty fields
- Location: e2e\UI\loginTest.spec.js:42:7

# Error details

```
Test timeout of 20000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 20000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/teacher/dashboard" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - heading "Teacher Login" [level=1] [ref=e6]
    - paragraph [ref=e7]: Access your class dashboard
  - generic [ref=e8]:
    - generic [ref=e9]:
      - generic [ref=e10]: Email *
      - textbox "Email *" [active] [ref=e12]:
        - /placeholder: Enter Email
    - generic [ref=e13]:
      - generic [ref=e14]: Password *
      - generic [ref=e15]:
        - textbox "Password *" [ref=e16]:
          - /placeholder: Enter Password
        - button [ref=e17]:
          - img [ref=e18]
    - button "Login" [ref=e21]
  - generic [ref=e22]:
    - paragraph [ref=e23]:
      - text: Don't have an account?
      - link "Sign up" [ref=e24] [cursor=pointer]:
        - /url: /teacher/signup
    - paragraph [ref=e25]:
      - link "Student Login" [ref=e26] [cursor=pointer]:
        - /url: /student/login
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | export class LoginPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.emailInput = page.locator("#email");
  8  |     this.passwordInput = page.getByPlaceholder("Enter Password");
  9  |     this.submitButton = page.locator("button[type='submit']");
  10 |   }
  11 | 
  12 |   async goto() {
  13 |     await this.page.goto("http://localhost:5173/teacher/login");
  14 |   }
  15 | 
  16 |   async login(email, password) {
  17 |     await this.emailInput.fill(email);
  18 |     await this.passwordInput.fill(password);
  19 |     await this.submitButton.click();
> 20 |     await this.page.waitForURL("**/teacher/dashboard");
     |                     ^ Error: page.waitForURL: Test timeout of 20000ms exceeded.
  21 |   }
  22 | 
  23 |   async verifyPageLoaded() {
  24 |     await expect(this.page).toHaveTitle("Teacher Login - Student Tracker");
  25 |   }
  26 |   async verifyInvalidLoginMessage() {
  27 |     await expect(this.page.getByText("Invalid credentials")).toBeVisible();
  28 |   }
  29 |   async verifyInvalidemail() {
  30 |     const message = await this.emailInput.evaluate(
  31 |       (el) => el.validationMessage,
  32 |     );
  33 |     expect(message).toContain("@");
  34 |   }
  35 | 
  36 |   async verifyEmptyFeilds() {
  37 |     const message = await this.emailInput.evaluate(
  38 |       (el) => el.validationMessage,
  39 |     );
  40 |     expect(message).toContain("Please fill out this field.");
  41 |   }
  42 |   async verifyEmptyPasswordFeild() {
  43 |     const message = await this.passwordInput.evaluate(
  44 |       (el) => el.validationMessage,
  45 |     );
  46 |     expect(message).toContain("Please fill out this field.");
  47 |   }
  48 | 
  49 |   async verifyVisiblityofLoginPageElements() {
  50 |     await expect(this.emailInput).toBeVisible();
  51 |     await expect(this.passwordInput).toBeVisible();
  52 |     await expect(this.submitButton).toBeVisible();
  53 |   }
  54 | }
  55 | 
```