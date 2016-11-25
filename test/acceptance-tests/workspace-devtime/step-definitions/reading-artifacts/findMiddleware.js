'use strict';
var app = require('../../../../../');
var async = require('async');
var expect = require('chai').expect;
var loopback = require('loopback');
var path = require('path');
var util = require('util');
var workspaceManager = require('../../../../../datasource/workspaceManager.js');

module.exports = function() {
  var numberOfExpectedPhases = 0;
  var numberOfAvailablePhases = 0;
  var Middleware = app.models.Middleware;
  var exampleWorkspace = path.resolve(__dirname, '../../../../../example');
  workspaceManager.createWorkspace(exampleWorkspace);
  var testsuite = this;

  this.Given(/^The workspace has (\d+) middleware phases configured$/, function(numberOfExpectedPhases, next) {
    testsuite.numberOfExpectedPhases = parseInt(numberOfExpectedPhases);
    next();
  });

  this.When(/^I list the middlewares$/, function(next) {
    Middleware.all(exampleWorkspace, function(err, list) {
      if (err) return next(err);
      testsuite.numberOfAvailablePhases = list.length;
      next();
    });
  });

  this.Then(/^All the phases are returned$/, function(next) {
    expect(testsuite.numberOfExpectedPhases).to.equal(testsuite.numberOfAvailablePhases);
    next();
  });

  this.Given(/^The workspace middleware has a phase '(.+)'$/, function(phaseName, next) {
    testsuite.phaseName = phaseName;
    next();
  });

  this.When(/^I query for the phase$/, function(next) {
    Middleware.find(exampleWorkspace, testsuite.phaseName, function(err, config) {
      if (err) return next(err);
      testsuite.phaseConfig = config;
      next();
    });
  });

  this.Then(/^All middleware config for the phase is returned$/, function(next) {
      expect(Object.keys(testsuite.phaseConfig)).to.eql([
        'compression',
        'cors'
      ]);
      next();
  });
};
