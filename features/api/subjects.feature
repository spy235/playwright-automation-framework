Feature: Subjects API
  As an API test engineer
  I want to manage subjects through the API
  So that I can verify subject creation, retrieval, and deletion

  Scenario: Create, retrieve and delete subjects via API
    Given I have a valid teacher API token
    When I create the following subjects:
      | Mathematics |
      | Physics |
      | Chemistry |
    Then I can retrieve the subjects
    And I can delete all created subjects
