Feature: Student management
  As a teacher
  I want to add a student
  So that the student appears in the system

  Scenario: Add a new student
    Given I am logged in as a teacher
    And required subjects exist for the new student
    When I create a new student
    Then the student should be saved successfully
