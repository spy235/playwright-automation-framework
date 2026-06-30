Feature: Subject management
  As a teacher
  I want to add subjects
  So that subjects are available for students

  Scenario: Add multiple subjects
    Given I am logged in as a teacher
    When I add the following subjects:
      | English |
      | Geography |
      | Physics |
    Then I should see all subjects in the subject list
