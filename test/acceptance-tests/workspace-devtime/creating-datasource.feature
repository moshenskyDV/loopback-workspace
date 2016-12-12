Feature: Users should be able to configure a datasource 
  As a workspace client using the EXAMPLE workspace
  I want to configure a list of datasources in my workspace,
  discover models in the datasource, and attach existing models
  to the datasource

  Background: Workspace is loaded in a given directory

  Scenario: Configure a datasource
    Given that I have loaded the workspace
    When I configure datasources 'SalesDB'
    Then the datasource config json file is updated

  Scenario: Discover Models
    Given The datasource 'SalesDB' is created
    When I discover models from the datasource
    Then The models 'Customer, Order' are discovered

  Scenario: Attach a model to the datasource
    Given The model 'Review' exists
    When I attach the model to the datasource 'SalesDB'
    Then The model definition json is updated

  Scenario: Test a datasource connection
    Given The datasource 'SalesDB' exists
    When I test the for the connection
    Then the connection results are returned
