Feature: Teacher login
  As a teacher
  I want to log in to the student tracker
  So that I can access the dashboard

  Scenario: Successful login with valid credentials
    Given I am on the teacher login page
    When I log in with valid credentials
    Then I should see the teacher dashboard

  Scenario: Login failure with invalid credentials
    Given I am on the teacher login page
    When I log in with invalid credentials
    Then I should see a login error

  Scenario: Login failure with invalid email format
    Given I am on the teacher login page
    When I log in with an invalid email format
    Then I should see a validation error for email

  Scenario: Login failure with empty fields
    Given I am on the teacher login page
    When I attempt to log in with empty email and password
    Then I should see required field validation errors

  Scenario: Login page UI elements are visible
    Given I am on the teacher login page
    Then I should see the login page fields and button
