'use strict';
var app = require('../../../../../');
var async = require('async');
var chai = require('chai');
var loopback = require('loopback');
var path = require('path');
var util = require('util');
var workspaceManager = require('../../../../../datasource/workspaceManager.js');

module.exports = function() {
  var ModelRelation = app.models.ModelRelation;
  var exampleWorkspace = path.resolve(__dirname, '../../../../../example');
  workspaceManager.createWorkspace(exampleWorkspace);

  var testsuite = this;
  this.Given(/^The model '(.+)' has a relation '(.+)'$/, function(modelName, relationName, next) {
    testsuite.modelName = modelName;
    testsuite.relationName = relationName;
    next();
  });

  this.When(/^I query for the model relation$/, function(next) {
    var relationId = 'common.' + testsuite.modelName + '.' + testsuite.relationName;
    ModelRelation.getData(relationId, function(err, data) {
      if (err) return next(err);
      testsuite.relationConfig = data;
      next();
    });
  });

  this.Then(/^The model relation config is returned$/, function(next) {
    var expect = chai.expect;
    expect(Object.keys(testsuite.relationConfig)).to.eql([
      'type',
      'model',
      'foreignKey',
      'through'
    ]);
    next();
  });
};
