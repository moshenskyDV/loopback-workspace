Feature: Users should be able to create workspaces from templates
  As a user I want to create a workspace from one of the available templates
  and create artifacts in the freshly created workspace

  Background: Templates are available

  Scenario: Create a workspace from template
    Given that a 'empty-server' template exists
    When I create the workspace from the template
    Then the workspace is created with all template artifacts

  Scenario: Create a workspace from template
    Given that a 'api-server' template exists
    When I create the workspace from the template
    Then the workspace is created with all template artifacts

  Scenario: Create a workspace from template
    Given that a 'notes-api' template exists
    When I create the workspace from the template
    Then the workspace is created with all template artifacts

