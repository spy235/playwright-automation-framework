export class StudentPage {
  constructor(page) {
    this.page = page;
  }

  async createStudent(student) {
    await this.page.goto("http://localhost:5173/teacher/dashboard");
    await this.page.locator("a[href='/teacher/students/add']").click();
    await this.page.getByPlaceholder("Enter Full Name").fill(student.name);
    await this.page
      .getByPlaceholder("Enter Roll Number")
      .fill(student.rollNumber);
    await this.page.getByPlaceholder("Enter Password").fill(student.password);

    await this.page
      .locator("input[name='confirmPassword']")
      .fill(student.password);

    await this.page.locator('#subject-select-0').selectOption(student.subject);

    await this.page.getByPlaceholder("Marks").fill(student.marks);

    await this.page.locator("#create-student-btn").click();
  }
}
