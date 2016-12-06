// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var fs = require('fs-extra');
var path = require('path');
var workspaceManager = require('../../datasource/workspaceManager.js');

module.exports = function(ModelConfig) {
  /**
   * Defines a model configuration which attaches a model to a facet and a
   * dataSource. It also can extend a model definition with additional configuration.
   *
   * @class ModelDefinition
   * @inherits Definition
   */

  ModelConfig.getAllData = function(cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readAllModelConfig(cb); 
  };
};
