const { setWorldConstructor } = require("@cucumber/cucumber");
const { users } = require("../../test-data/user");

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.requestContext = null;
    this.users = users;
    this.baseUrl = "http://localhost:5173";
    this.apiBaseUrl = "http://localhost:5000";
    this.student = null;
    this.subjects = [];
    this.apiToken = null;
    this.retrievedSubjects = [];
  }
}

setWorldConstructor(CustomWorld);
