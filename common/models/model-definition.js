// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var workspaceManager = require('../../datasource/workspaceManager.js');

module.exports = function(ModelDefinition) {
  /**
   * Defines a model configuration which attaches a model to a facet and a
   * dataSource. It also can extend a model definition with additional configuration.
   *
   * @class ModelDefinition
   * @inherits Definition
   */

  ModelDefinition.getData = function(id, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readModel(id, cb); 
  };
};
