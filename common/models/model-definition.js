// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var clone = require('lodash').clone;
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
    workspace.readModel(id, function(err, modelDef) {
      var modelData = clone(modelDef);
      delete modelData['properties'];
      delete modelData['methods'];
      delete modelData['relations'];
      delete modelData['validations'];
      delete modelData['acls'];
      modelData['id'] = id;
      cb(null, modelData);
    }); 
  };

  ModelDefinition.updateData = function(id, data, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.updateModel(id, data, cb); 
  };

  ModelDefinition.add = function(data, cb) {
    var workspace = workspaceManager.getWorkspace();
    var id = data.id;
    workspace.createModel(id, data, cb); 
  };
};
