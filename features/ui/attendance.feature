Feature: Attendance management
  As a teacher
  I want to see student attendance records
  So that I can verify students are present

  Scenario: Student appears in attendance list after creation
    Given a teacher student exists
    When I view the attendance page
    Then I should see the student in the attendance list
