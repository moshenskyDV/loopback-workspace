Feature: Multiple Processes must be able to access the same workspace
  Multiple processes can load the same workspace and create, update  
  artifacts simultaneously without overwriting the others work.

  Background: Two workspace processes are created

  Scenario: Load the workspace with two child processes
    Given that a 'EXAMPLE' workspace exists
    When I load the workspace in two child processes 'process1' and 'process2'
    Then I am able to create a property using them as 'property1' and 'property2' respectively

  Scenario: create a model with two child processes
    Given that a 'EXAMPLE' workspace exists
    When I load the workspace in two child processes 'process1' and 'process2'
    Then I am able to create models 'model1' and 'model2' respectively


