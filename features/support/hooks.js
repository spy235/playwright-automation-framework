const { Before, After } = require("@cucumber/cucumber");
const playwright = require("playwright");

Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.requestContext = await playwright.request.newContext({
    baseURL: this.apiBaseUrl,
  });
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
  if (this.requestContext) await this.requestContext.dispose();
});
