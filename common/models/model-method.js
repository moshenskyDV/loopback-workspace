// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var semver = require('semver');
var path = require('path');
var fs = require('fs-extra');
var workspaceManager = require('../../datasource/workspaceManager.js');

/**
  * Represents a Method of a LoopBack `Model`.
  *
  * @class ModelMethod
  * @inherits WorkspaceEntity
  */
module.exports = function(ModelMethod) {
  ModelMethod._shouldEncodeStaticFlagInName = function() {
    var version = ModelMethod.app.models.Workspace.loopBackVersion;
    return version != null ? !semver.gtr('3.0.0', version) : false;
  };

  ModelMethod.getJsonKey = function(name, data) {
    if (!this._shouldEncodeStaticFlagInName()) {
      return data.name;
    }
    var isStatic = data.isStatic;
    if (isStatic !== undefined) {
      var matchName = name.match(/^prototype\.(.*)$/);
      if (!isStatic && (matchName === null || !matchName)) {
        data.name = 'prototype.' + name;
      }
    }

    return data.name;
  };

  ModelMethod.getData = function(id, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readModelMethod(id, cb); 
  };
};
