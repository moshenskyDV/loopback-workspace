Feature: Users should be able to load multiple workspaces
  As a client of multiple workspaces I want to load 
  multiple workspaces, and work on all of them simultaneously

  Background: workspace component is initialized

  Scenario: Load a workspace
    Given that a 'EXAMPLE' workspace exists
    When I load the workspace
    Then a workspace ID is returned

  Scenario: Load another workspace
    Given that a 'SECONDARY' workspace exists
    When I load the workspace
    Then a workspace ID is returned

  Scenario: Add a model to the first workspace
    Given The workspace 'EXAMPLE' is loaded
    When I add a model 'Supplier' using the workspace ID
    Then The model definition json is created in 'EXAMPLE'

  Scenario: Add a model to the second workspace
    Given The workspace 'SECONDARY' is loaded
    When I add a model 'Supplier' using the workspace ID
    Then The model definition json is created in 'SECONDARY'
