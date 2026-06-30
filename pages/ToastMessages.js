const { expect } = require("@playwright/test");

class ToastMessages {
  constructor(page) {
    this.page = page;
  }

  async verifyInvalidLoginMessage() {
    await expect(this.page.getByText(/invalid credentials/i)).toBeVisible();
  }
}

module.exports = { ToastMessages };
