Feature: Users should be able to read a list of artifacts
  As a workspace client using the EXAMPLE workspace
  I want to read a list of artifacts in my workspace
  So that I can reference the contents of my application by name

  Background: Workspace is loaded in a given directory

  Scenario: Get a list of models
    Given I have a workspace containing 2 model(s)
    When I list models for the workspace
    Then All the model configs are returned

  Scenario: find a model definition
    Given The model 'users' exists
    When I query for the model definition of 'users'
    Then The model definition is returned

  Scenario: find a model property
    Given The model 'users' has a property 'id'
    When I query for the model property
    Then The model property config is returned

  Scenario: find a model method
    Given The model 'users' has a method 'greet'
    When I query for the model method
    Then The model method config is returned

  Scenario: find a model relation
    Given The model 'users' has a relation 'roles'
    When I query for the model relation
    Then The model relation config is returned

  Scenario: get a list of access control list (ACL) for a model
    Given The model 'TestModel' exists and it has 3 ACL configurations
    When I list the model access controls for the model 'TestModel'
    Then All the acl configurations are returned
