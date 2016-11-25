// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var fs = require('fs-extra');
var path = require('path');
var workspaceManager = require('../../datasource/workspaceManager.js');
/**
  * Defines a `Middleware` configuration.
  * @class Middleware
  * @inherits Definition
  */
module.exports = function(Middleware) {

  Middleware.getUniqueId = function(data) {
    var phase = data.phase;
    if (data.subPhase) {
      phase = phase + ':' + data.subPhase;
    }
    var index = '';
    if (data.index) {
      index = '.' + data.index.toString();
    }
    return phase + '.' + data.name + index;
  };

  Middleware.all = function(cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readAllMiddleware(this, cb); 
  }

  Middleware.find = function(id, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readMiddleware(this, id, cb); 
  }
};