'use strict';
var app = require('../../../../../');
var async = require('async');
var chai = require('chai');
var loopback = require('loopback');
var path = require('path');
var util = require('util');
var workspaceManager = require('../../../../../datasource/workspaceManager.js');

module.exports = function() {
  var ModelMethod = app.models.ModelMethod;
  var exampleWorkspace = path.resolve(__dirname, '../../../../../example');
  workspaceManager.createWorkspace(exampleWorkspace);

  var testsuite = this;
  this.Given(/^The model '(.+)' has a method '(.+)'$/, function(modelName, methodName, next) {
    testsuite.modelName = modelName;
    testsuite.methodName = methodName;
    next();
  });

  this.When(/^I query for the model method$/, function(next) {
    var methodId = 'common.' + testsuite.modelName + '.' + testsuite.methodName;
    ModelMethod.getData(methodId, function(err, data) {
      if (err) return next(err);
      testsuite.methodConfig = data;
      next();
    });
  });

  this.Then(/^The model method config is returned$/, function(next) {
    var expect = chai.expect;
    expect(Object.keys(testsuite.methodConfig)).to.eql([
      'isStatic',
      'accepts',
      'returns',
      'http',
    ]);
    next();
  });
};
