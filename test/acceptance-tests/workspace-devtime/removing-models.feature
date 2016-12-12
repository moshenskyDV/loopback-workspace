Feature: Users should be able to remove artifacts from the workspace
  As a workspace client using the EXAMPLE workspace
  I want to remove a model from my workspace if it it is not referred
  by any other workspace artifact

  Background: Workspace is loaded in a given directory

  Scenario: Remove a model which is referred by another model
    Given I have a workspace containing model 'Order' with 'hasmany' relation with 'Customer'
    When I try to remove model 'Order'
    Then an error message is returned

  Scenario: Remove a model which is referred by another model
    Given I have a workspace containing model 'Order' with 'hasmany' relation with 'Customer'
    When I try to remove model 'Order' after removing the relation
    Then I am able to remove the model

