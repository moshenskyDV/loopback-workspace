Feature: Users should be able to create models 
  As a workspace client using the EXAMPLE workspace
  I want to create a list of models in my workspace,
  add properties and methods, add relations inbetween
  models and attach the models to a datasource

  Background: Workspace is loaded in a given directory

  Scenario: Create a model
    Given that I have loaded the workspace
    When I create models 'Customer' and 'Order'
    Then the model json definition files are created

  Scenario: Add properties to a model
    Given The model 'Customer' exists
    When I add properties 'name, id, telephone'
    Then The model definition json is updated

  Scenario: Add properties to a model
    Given The model 'Order' exists
    When I add properties 'orderId, customerId, item, quantity'
    Then The model definition json is updated

  Scenario: Add a Relation
    Given The model 'Order' is a created
    When I add a relation 'OrderedBy' between 'Order' and 'Customer'
    Then a model relation is created

  Scenario: Add a method to a model
    Given The model 'Customer' exists
    When I add a custom method 'NotifyCustomerSupport'
    Then The model definition json is updated

  Scenario: Add access control for a model
    Given The model 'Customer' exists
    When I add 'write' access for the user 'admin'
    Then The model definition json is updated
